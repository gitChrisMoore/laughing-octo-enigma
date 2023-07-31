// ignore typescript in this file

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import uuid from "react-uuid";
import Button from "../../../components/Button/Button";
import { GenericMessage, GenericMessageSchema } from "./GenericSchema";

const GenericConvoSSE: React.FC = () => {
  const [conversation_id, setConversation_id] = useState(uuid());
  const [messages, setMessages] = useState<GenericMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleSubmit = async (userInput: string) => {
    // e.preventDefault();
    const data = {
      role: "user",
      content: userInput,
    };
    fetch("/api/submit_events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        crossDomain: "true",
      },
      body: JSON.stringify(data),
    });
  };

  const handleEvent = async (e: any) => {
    console.log("Message: ", e);
    console.log(e.data);
    // replace single quotes with double quotes
    const resMessage = GenericMessageSchema.parse(
      JSON.parse(e.data.replace(/'/g, '"'))
    );
    setMessages((messages) => [...messages, resMessage]);

    // const resMessage = GenericMessageSchema.parse(JSON.parse(e.data));
    console.log(resMessage);
  };

  const formik = useFormik({
    initialValues: {
      userInput: "input message here",
    },
    onSubmit: (values) => {
      handleSubmit(values.userInput);
    },
  });

  useEffect(() => {
    const source = new EventSource(`/api/events`);
    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });
    source.addEventListener("message", (e) => {
      handleEvent(e);
      scrollToBottom();
    });
    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    const new_conversation_id = uuid();
    setConversation_id(new_conversation_id);

    return () => {
      source.close();
    };
  }, []);

  // console log when a conoponent did update
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <>
      <div className="h-[calc(100vh-125px)] flex flex-col">
        {/* top Chat */}
        <div className="flex flex-col overflow-auto bg-white p-4">
          {messages.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 text-sm rounded-lg shadow-md"
            >
              <h2 className="mb-1 font-medium">{item.content}</h2>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
          {/* <div ref={messagesEndRef}></div> */}
          {/* <AlwaysScrollToBottom /> */}
        </div>

        {/* bottom footer */}
        <div className="sticky top-[100vh]">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Conversation</h2>
              <Button type="submit">Send Message</Button>
            </div>

            <div className="pt-4">
              <input
                className="w-full text-sm rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
                id="userInput"
                name="userInput"
                onChange={formik.handleChange}
                value={formik.values.userInput}
              />
            </div>
          </form>
          <div>{conversation_id}</div>
        </div>
        {/* line break */}
        <br />
      </div>
    </>
  );
};

export default GenericConvoSSE;
