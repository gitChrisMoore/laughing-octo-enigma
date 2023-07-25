import { useState } from "react";
import { TargetMarket, parseTargetMarket } from "./TargetMarket";
import { Message, getOpenAPIMessage } from "../../utils/useOpenAI";
import { useFormik } from "formik";
import TargetMarketList from "./TargetMarketList";

const defaultMessages = [
  {
    role: "system",
    content:
      "You are a helpful assistant and should respond always in valid json. " +
      "You should respond with example target markets. " +
      "age_range should be a low and high int. " +
      "description, buying_power, and education_level should be string. " +
      "interests should be a list of strings. ",
  },
] as Message[];

const TargetMarketOverview: React.FC = () => {
  const [targetmarkets, setTargetMarkets] = useState<TargetMarket[]>([]);
  const [messages, setMessages] = useState(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const messagesRequest = [...messages, { role: "user", content: userInput }];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessage(messagesRequest as Message[]);
      const persona = parseTargetMarket(response.content);
      setTargetMarkets([...targetmarkets, persona]);
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
      userInput: "Generate a target market",
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
              Target Market Generator
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

      <TargetMarketList targetMarkets={targetmarkets} />
    </>
  );
};

export default TargetMarketOverview;
