import { useState } from "react";

import { Message, getOpenAPIMessage } from "../../utils/useOpenAI";
import { useFormik } from "formik";
import MarketTrendList from "./MarketTrendList";
import { MarketTrend, parseMarketTrend } from "./MarketTrend";

const defaultMessages = [
  {
    role: "system",
    content:
      "Imagine you are a consultant, and you are talking to your Client about different trends within a given market. " +
      "You should only respond in valid JSON. " +
      "Based on the industry or market, respond with a trend. " +
      "trend should be the name of the trend as a string. " +
      "description should be a string. " +
      "implications, leading_companies, and opportunities should be lists of strings. ",
  },
] as Message[];

const MarketTrendOverview: React.FC = () => {
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [messages, setMessages] = useState(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const messagesRequest = [...messages, { role: "user", content: userInput }];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessage(messagesRequest as Message[]);
      const marketTrend = parseMarketTrend(response.content);
      setMarketTrends([...marketTrends, marketTrend]);
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
      userInput: "USB Cords",
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
              Market Trend Generator
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

      <MarketTrendList marketTrends={marketTrends} />
    </>
  );
};

export default MarketTrendOverview;
