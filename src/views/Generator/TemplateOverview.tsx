import { Key, useState } from "react";
import {
  Trend,
  TrendListItem,
  parseTrend,
  trendDefaultMessages,
  trendMessageFunctions,
} from "./Trend/Trend";
import { useFormik } from "formik";
import { Message, getOpenAPIMessageFunction } from "../../utils/useOpenAI";

const TrendOverviewNew: React.FC = () => {
  const [items, setItems] = useState<Trend[]>([]);

  // pass items and setItems to the TemplateOverview component
  return (
    <>
      <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <div className="max-w-xl mx-auto">
          <TemplateOverview
            items={items}
            setItems={setItems}
            defaultMessages={trendDefaultMessages}
            messageFunctions={trendMessageFunctions}
            parseItem={parseTrend}
            ListItem={TrendListItem}
          />
        </div>
      </main>
    </>
  );
};

const TemplateOverview: React.FC<{
  items: any;
  setItems: any;
  defaultMessages: any;
  messageFunctions: any;
  parseItem: any;
  ListItem: any;
}> = ({
  items,
  setItems,
  defaultMessages,
  messageFunctions,
  parseItem,
  ListItem,
}) => {
  const [messages, setMessages] = useState(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetConversation = async (userInput: string) => {
    const newUserMessage = { role: "user", content: userInput } as Message;
    const messagesRequest = [...messages, newUserMessage];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessageFunction(
        messagesRequest as Message[],
        messageFunctions
      );
      console.log("handleGetConversation response: ", response);
      const marketTrend = parseItem(response.content);
      setItems([...items, marketTrend]);
      setMessages([...messages, newUserMessage, response]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userInput: "Software Quality Engineering",
    },
    onSubmit: (values: { userInput: string }) => {
      handleGetConversation(values.userInput);
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

      <div className=" ">
        {items.reverse().map((item: any, index: Key | null | undefined) => (
          <ListItem key={index} marketTrend={item} />
        ))}
      </div>
    </>
  );
};

export default TrendOverviewNew;
