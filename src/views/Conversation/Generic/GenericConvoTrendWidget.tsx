import { useEffect, useRef, useState } from "react";
import { Trend, TrendSchema } from "./TrendEventSchema";
import JSON5 from "json5";
import { FuncMessageSchema } from "./FuncMessageSchema";

const AI_SOURCE_ID = "trend_bot";

type GenericConvoTrendWidgetProps = {
  eventsAPI: string;
  funcName: string;
};

const GenericConvoTrendWidget: React.FC<GenericConvoTrendWidgetProps> = ({
  ...props
}) => {
  const { eventsAPI, funcName } = props;
  const [messages, setMessages] = useState<Trend[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleEvent = async (event: MessageEvent) => {
    try {
      const msg = FuncMessageSchema.parse(JSON5.parse(event.data));
      if (msg.source_id !== AI_SOURCE_ID) return;

      const resMessage = TrendSchema.parse(msg.payload);
      setMessages((messages) => [...messages, resMessage]);
      console.log(`component: ${funcName} status: handleEvent success`);
    } catch (error) {
      console.log(`component: ${funcName} status: handleEvent error`);
      console.log(`component: ${funcName} msg: ${event.data}`);
      console.log(error);
    }
  };

  useEffect(() => {
    const source = new EventSource(eventsAPI);
    source.addEventListener("open", () => {
      console.log("GenericConvoTrendWidget SSE opened!");
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
      {/* top Chat */}

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
      {/* bottom footer */}
    </>
  );
};

export default GenericConvoTrendWidget;
