// ignore typescript in this file

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import uuid from "react-uuid";
import Button from "../../../components/Button/Button";
import { GenericMessage, GenericMessageSchema } from "./GenericSchema";

type AvatarProps = {
  children?: React.ReactNode;
  backgroundColor?: string; // New prop to specify the background color class
};

const Avatar = ({
  children,
  backgroundColor = "bg-slate-500",
}: AvatarProps) => {
  const avatarStyle = `rounded-full border-2 border-white text-white ${backgroundColor}`;
  return (
    <div
      className={`h-8 w-8 mr-1 flex items-center justify-center ${avatarStyle}`}
    >
      <span className="text-xs">{children}</span>
    </div>
  );
};

const IconBrainCircuit = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      // {...props}
    >
      <path d="M12 4.5a2.5 2.5 0 00-4.96-.46 2.5 2.5 0 00-1.98 3 2.5 2.5 0 00-1.32 4.24 3 3 0 00.34 5.58 2.5 2.5 0 002.96 3.08 2.5 2.5 0 004.91.05L12 20V4.5zM16 8V5c0-1.1.9-2 2-2M12 13h4" />
      <path d="M12 18h6a2 2 0 012 2v1M12 8h8M20.5 8a.5.5 0 11-1 0 .5.5 0 011 0zM16.5 13a.5.5 0 11-1 0 .5.5 0 011 0z" />
      <path d="M20.5 21a.5.5 0 11-1 0 .5.5 0 011 0zM18.5 3a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  );
};

const IconUser = () => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
    >
      <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
    </svg>
  );
};

const GenericConvoSSE: React.FC = () => {
  const [conversation_id, setConversation_id] = useState(uuid());
  const [messages, setMessages] = useState<GenericMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const submitAPI = "/api/events/strategy/market_obsticle-general";
  const eventsAPI = "/api/events/strategy/market_obsticle-general/subscribe";

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
    fetch(submitAPI, {
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
      userInput: "",
    },
    onSubmit: (values) => {
      handleSubmit(values.userInput);
      formik.resetForm();
    },
  });

  useEffect(() => {
    const source = new EventSource(eventsAPI);
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
      <div className="h-[calc(100vh-88px)] justify-end    flex flex-col ">
        {/* top Chat */}

        <div className="flex flex-col overflow-auto py-2">
          {messages.map((item, index) => (
            // show one div if the message is from the user, and other for all else

            <div
              key={index}
              className={`flex flex-col text-sm  rounded-xl mt-2 ${
                item.role === "user" ? "bg-slate-300" : "bg-slate-100 shadow-md"
              }`}
            >
              <div className="flex flex-row p-2">
                <div className={`flex`}>
                  {/* if item.role is assisstant, then put ai in initials */}
                  {item.role === "assistant" ? (
                    <Avatar>
                      <IconBrainCircuit />
                    </Avatar>
                  ) : (
                    <Avatar backgroundColor="bg-sky-500">
                      <IconUser />
                    </Avatar>
                  )}
                </div>
                <div className="flex grow">
                  <p className="text-xs whitespace-pre-line">{item.content}</p>
                </div>
              </div>
            </div>

            // <div
            //   key={index}
            //   className="flex flex-col p-4 text-sm rounded-lg shadow-md"
            // >
            //   <p className="text-xs whitespace-pre-line">{item.content}</p>
            // </div>
          ))}

          <div ref={messagesEndRef}></div>
          {/* <div ref={messagesEndRef}></div> */}
          {/* <AlwaysScrollToBottom /> */}
        </div>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width={20}
                    height={20}
                  >
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                  </svg>
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

export default GenericConvoSSE;
