import { useEffect, useRef, useState } from "react";
import { TrendEvent, TrendEventSchema } from "./TrendEventSchema";
import JSON5 from "json5";

const CONVO_EVENTS_API = "/api/events/strategy/market_obsticle-typed/subscribe";
const FUNCNAME = "GenericConvoTrendWidget";

type GenericConvoTrendWidgetProps = {
  eventsAPI: string;
  funcName: string;
};

const GenericConvoTrendWidget: React.FC<GenericConvoTrendWidgetProps> = ({
  ...props
}) => {
  const { eventsAPI = CONVO_EVENTS_API, funcName = FUNCNAME } = props;
  const [messages, setMessages] = useState<TrendEvent[]>([]);
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
      const resMessage = TrendEventSchema.parse(JSON5.parse(event.data));
      setMessages((messages) => [...messages, resMessage]);
      console.log(`component: ${funcName} status: handleEvent success`);
    } catch (error) {
      console.log(`component: ${funcName} status: handleEvent error`);
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
