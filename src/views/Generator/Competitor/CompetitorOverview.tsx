import { useState } from "react";
import { useFormik } from "formik";
import { Message, getOpenAPIMessageFunction } from "../../../utils/useOpenAI";
import Button from "../../../components/Button/Button";
import { Competitor, CompetitorSchema } from "./CompetitorSchema";
import { competitorPrompt } from "./CompetitorPrompt";

const ObstacleOverview: React.FC = () => {
  const [items, setItems] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const alreadyMentioned = items.map((item) => item.name);
    const alreadyMentionedString = alreadyMentioned.join(", ");
    const newUserMessage = {
      role: "user",
      content:
        "already mentioned, do not respond with: " +
        alreadyMentionedString +
        ". " +
        userInput,
    } as Message;

    const messagesRequest = [
      ...competitorPrompt.initialMessages,
      newUserMessage,
    ];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessageFunction(
        messagesRequest as Message[],
        competitorPrompt.functions,
        competitorPrompt.functions[0].name
      );
      const resMessage = CompetitorSchema.parse(JSON.parse(response.content));
      setItems([...items, resMessage]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userInput: competitorPrompt.initialUserInput,
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
              {competitorPrompt.title}
            </h2>
            <Button type="submit">Generate</Button>
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
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 text-sm rounded-lg shadow-md"
          >
            <h2 className="mb-1 font-medium">{item.name}</h2>
            <p className="mb-1">{item.market_position}</p>
            <p className="mb-1">{item.value_prop}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ObstacleOverview;
