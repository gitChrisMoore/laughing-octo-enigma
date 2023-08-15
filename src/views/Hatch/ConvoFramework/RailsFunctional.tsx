// ignore typescript in this file

import { useEffect, useRef, useState } from "react";
import JSON5 from "json5";
import useEventSourceListener from "./useEventSourceListener";

import { FuncMessageSchema } from "../Models/FuncMessageSchema";
import { Trend, TrendSchema } from "../Models/TrendEventSchema";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TYPED_EVENTS_API = VITE_API_BASE_URL + "/api/rails_functional/subscribe";

const AI_SOURCE_ID = "trend_bot";

// TODO:
// - [ ] utilize conversation id
// - [ ] fix the avatar on the individual messages

const RailsFunctional: React.FC = () => {
  const funcName = "rails_functional";
  const [messages, setMessages] = useState<Trend[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleEvent = (event: MessageEvent) => {
    try {
      if (event.data && event.data.includes("'payload': None")) {
        console.log("payload is None");
        return;
      }
      const msg = FuncMessageSchema.parse(JSON5.parse(event.data));
      if (msg.source_id !== AI_SOURCE_ID) return;
      const resMessage = TrendSchema.parse(msg.payload);
      setMessages((messages) => [...messages, resMessage]);
      console.log(`component: ${funcName} status: handleEvent success`);
    } catch (error) {
      console.log(`component: ${funcName} status: handleEvent error`);
      console.log(error);
    }
  };

  const { start, stop } = useEventSourceListener(
    TYPED_EVENTS_API,
    () => console.log("Functional SSE opened!"),
    (e) => handleEvent(e),
    (e) => console.error("Error:", e)
  );

  useEffect(() => {
    const source = start();

    return () => {
      stop(source);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="flex flex-col overflow-auto py-2 text-xs">
        {messages.map((item, index) => (
          <div key={index} className="py-2">
            <div>
              <p className="whitespace-pre-line">{item.title}</p>
            </div>

            <div>
              <p className="whitespace-pre-line">{item.implication}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </>
  );
};

export default RailsFunctional;
