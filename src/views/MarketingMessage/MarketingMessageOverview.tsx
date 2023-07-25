import { useState } from "react";

import { Message, getOpenAPIMessage } from "../../utils/useOpenAI";
import { useFormik } from "formik";
import { MarketingMessage, parseMarketingMessage } from "./MarketingMessage";
import MarketingMessageList from "./MarketingMessageList";

const defaultMessages = [
  {
    role: "system",
    content:
      "Imagine you are Steve Jobs, and the USER is the Client. " +
      "The USER is going to give you a description of a product or service, it is your job to come up with the marketing message. " +
      "Only respond in valid JSON. " +
      "slogan, description, call_to_action, and unique_selling_point should be strings. " +
      "features, target_audiences should be lists of strings. " +
      "Come up with different marketing messages that are unique each time. ",
  },
] as Message[];

const MarketingMessageOverview: React.FC = () => {
  const [marketingMessages, setMarketingMessages] = useState<
    MarketingMessage[]
  >([]);
  const [messages, setMessages] = useState(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const messagesRequest = [...messages, { role: "user", content: userInput }];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessage(messagesRequest as Message[]);
      const marketingMessage = parseMarketingMessage(response.content);
      setMarketingMessages([...marketingMessages, marketingMessage]);
      setMessages([...messages, response]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userInput: "USB Cords without power",
    },
    onSubmit: (values) => {
      handleGetPersona(values.userInput);
    },
  });

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              Marketing Message Generator
            </h2>
            <button
              type="submit"
              className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                aria-hidden="true"
              >
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              Generate
            </button>
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
      </div>

      {/* if is loading, display loading */}
      {isLoading && <div>Loading...</div>}

      <MarketingMessageList marketingMessages={marketingMessages} />
    </>
  );
};

export default MarketingMessageOverview;
