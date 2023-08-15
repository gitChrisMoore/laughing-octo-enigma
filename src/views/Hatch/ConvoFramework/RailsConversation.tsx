// ignore typescript in this file

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import uuid from "react-uuid";
import Button from "../../../components/Button/Button";
import JSON5 from "json5";
import IconSend from "../../../components/Icons/IconSend";
import { GenericMessage, GenericMessageSchema } from "../Models/GenericSchema";
import usePostUserEvent from "./usePostUserEvent";
import useEventSourceListener from "./useEventSourceListener";
import MessageList from "../Message/MessageList";

// TODO:
// - [ ] utilize conversation id
// - [ ] fix the avatar on the individual messages

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CONVO_EVENTS_API =
  VITE_API_BASE_URL + "/api/rails_conversational/subscribe";

const RailsConversation: React.FC = () => {
  const funcName = "rails_conversational";
  const [conversation_id] = useState(uuid());
  const [messages, setMessages] = useState<GenericMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { handleSubmit } = usePostUserEvent();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleEvent = (event: MessageEvent) => {
    try {
      const resMessage = GenericMessageSchema.parse(JSON5.parse(event.data));
      setMessages((messages) => [...messages, resMessage]);

      console.log(`component: ${funcName} status: handleEvent success`);
    } catch (error) {
      console.log(`component: ${funcName} status: handleEvent error`);
      console.log(error);
    }
  };

  const { start, stop } = useEventSourceListener(
    CONVO_EVENTS_API,
    // conversation_id,
    () => console.log("SSE opened!"),
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

  const formik = useFormik({
    initialValues: {
      userInput: "",
    },
    onSubmit: async (values) => {
      await handleSubmit(values.userInput, "GenericConvoSSE");
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="h-full justify-end flex flex-col ">
        {/* top Chat */}
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        {/* bottom footer */}
        <div className="sticky top-[100vh] my-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-row ">
              <div className={`flex grow`}>
                <input
                  className="w-full text-xs rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
                  id="userInput"
                  name="userInput"
                  placeholder="Type a message..."
                  onChange={formik.handleChange}
                  value={formik.values.userInput}
                />
              </div>
              <div className="flex ml-2">
                <Button type="submit">
                  {" "}
                  <IconSend />
                </Button>
              </div>
            </div>
          </form>

          <div className="flex py-2 items-center justify-center">
            <p className="text-xs text-slate-400 ">{conversation_id}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RailsConversation;
