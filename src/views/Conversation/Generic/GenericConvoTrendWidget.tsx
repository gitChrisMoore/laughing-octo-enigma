import { useEffect, useRef, useState } from "react";
import { TrendEvent, TrendEventSchema } from "./TrendEventSchema";

const GenericConvoTrendWidget: React.FC = () => {
  const [messages, setMessages] = useState<TrendEvent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const eventsAPI = "/api/events/strategy/market_obsticle-typed/subscribe";

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleEvent = async (e: any) => {
    console.log("Message: ", e);
    console.log(e.data);
    // replace single quotes with double quotes
    const resMessage = TrendEventSchema.parse(
      JSON.parse(e.data.replace(/'/g, '"'))
    );
    setMessages((messages) => [...messages, resMessage]);

    // const resMessage = GenericMessageSchema.parse(JSON.parse(e.data));
    console.log(resMessage);
  };

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

    return () => {
      console.log("widget closing");
      source.close();
    };
  }, []);

  // console log when a conoponent did update
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <>
      <div className="justify-end  flex flex-col px-2 ">
        {/* top Chat */}
        Trends
        <div className="flex flex-col overflow-auto py-2">
          {messages.map((item, index) => (
            // show one div if the message is from the user, and other for all else

            <div
              key={index}
              className={`flex flex-col text-sm  rounded-xl mt-2 ${
                item.role === "user" ? "bg-slate-300" : "bg-slate-100 shadow-md"
              }`}
            >
              <div className="flex ">
                <p className="text-xs whitespace-pre-line">{item.title}</p>
              </div>
              <div className="flex ">
                <p className="text-xs whitespace-pre-line">
                  {item.implication}
                </p>
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
      </div>
    </>
  );
};

export default GenericConvoTrendWidget;
