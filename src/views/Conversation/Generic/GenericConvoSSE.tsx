// ignore typescript in this file

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import uuid from "react-uuid";
import Button from "../../../components/Button/Button";
import { GenericMessage, GenericMessageSchema } from "./GenericSchema";
import JSON5 from "json5";
import IconBrainCircuit from "../../../components/Icons/IconBrainCircuit";
import IconUser from "../../../components/Icons/IconUser";
import IconSend from "../../../components/Icons/IconSend";
import Avatar from "../../../components/Avatar/Avatar";

const CONVO_SUBMIT_API = "/api/rails_conversational/";
const CONVO_EVENTS_API = "/api/rails_conversational/subscribe";
const FUNCNAME = "GenericConvoSSE";

type GenericConvoSSEProps = {
  submitAPI: string;
  eventsAPI: string;
  funcName: string;
};

const GenericConvoSSE: React.FC<GenericConvoSSEProps> = ({ ...props }) => {
  const {
    submitAPI = CONVO_SUBMIT_API,
    eventsAPI = CONVO_EVENTS_API,
    funcName = FUNCNAME,
  } = props;
  const [conversation_id, setConversation_id] = useState(uuid());
  const [messages, setMessages] = useState<GenericMessage[]>([]);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSSEActive, setIsSSEActive] = useState(false);
  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_INTERVAL_MS = 200;

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleSubmit = async (userInput: string) => {
    try {
      const response = await fetch(submitAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify({
          role: "user",
          content: userInput,
          consumer_id: "front-end",
        }),
      });

      if (response.status === 200) {
        console.log(`component: ${funcName} status: handleSubmit success`);
      } else {
        console.log(`component: ${funcName} status: handleSubmit error`);
        console.log(response.status);
      }
    } catch (error) {
      console.log(`component: ${funcName} status: handleSubmit error`);
      console.log(error);
    }
  };

  const handleEvent = async (event: MessageEvent) => {
    try {
      const resMessage = GenericMessageSchema.parse(JSON5.parse(event.data));
      setMessages((messages) => [...messages, resMessage]);
      console.log(`component: ${funcName} status: handleEvent success`);
    } catch (error) {
      console.log(`component: ${funcName} status: handleEvent error`);
      console.log(error);
    }
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

  // const connectToEventSource = () => {
  //   let source = null;
  //   let retryTimer = null;

  //   const connectToEventSource = () => {
  //     source = new EventSource(eventsAPI);
  //     source.addEventListener("open", () => {
  //       console.log("GenericConvoTrendWidget SSE opened!");
  //       setRetryAttempts(0); // Reset retry attempts on successful connection
  //       setIsSSEActive(true);
  //     });
  //     source.addEventListener("message", (e) => {
  //       handleEvent(e);
  //       scrollToBottom();
  //     });
  //     source.addEventListener("error", (e) => {
  //       console.error("Error: ", e);
  //       if (retryAttempts < MAX_RETRY_ATTEMPTS) {
  //         retryTimer = setTimeout(connectToEventSource, RETRY_INTERVAL_MS);
  //         setRetryAttempts((prevAttempts) => prevAttempts + 1);
  //         setIsSSEActive(false);
  //       } else {
  //         console.log(
  //           `Exceeded maximum retry attempts (${MAX_RETRY_ATTEMPTS}). Waiting for page refresh.`
  //         );
  //         setRetryAttempts(0);
  //         setIsSSEActive(false);
  //       }
  //     });
  //   };
  // };

  //   useEffect(() => {
  //     if (!isSSEActive) connectToEventSource();

  //     const new_conversation_id = uuid();
  //     setConversation_id(new_conversation_id);
  //   }, []);

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
      <div className="h-[calc(100vh-56px)] justify-end   flex flex-col ">
        {/* top Chat */}

        <div className="flex flex-col big-white overflow-auto py-2">
          {messages.map((item, index) => (
            // show one div if the message is from the user, and other for all else

            <div
              key={index}
              className={`flex flex-col text-sm  rounded-xl mt-2 ${
                item.role === "user" ? "bg-slate-300" : "bg-white shadow-md"
              }`}
            >
              <div className="flex flex-row p-2">
                <div className={`flex`}>
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
          ))}

          <div ref={messagesEndRef}></div>
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

export default GenericConvoSSE;
