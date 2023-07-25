import { useState } from "react";
import { Message, getOpenAPIMessage } from "../../utils/useOpenAI";
import { useFormik } from "formik";
import { Competitor, parseCompetitor } from "./Competitor";
import CompetitorList from "./CompetitorList";

const defaultMessages = [
  {
    role: "system",
    content:
      "You are a helpful assistant and should respond always in valid json. " +
      "The response should be a real, existing company. " +
      "Each response should be its own object. " +
      "competitor_name, industry, and specialization is a string. " +
      "strengths, and strategies can be a list of strings. ",
  },
] as Message[];

const CompetitorOverview: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [messages, setMessages] = useState(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const messagesRequest = [...messages, { role: "user", content: userInput }];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessage(messagesRequest as Message[]);
      const persona = parseCompetitor(response.content);
      setCompetitors([...competitors, persona]);
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
      userInput: "Apparel",
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
              Competitor Generator
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

      <CompetitorList competitors={competitors} />
    </>
  );
};

export default CompetitorOverview;
