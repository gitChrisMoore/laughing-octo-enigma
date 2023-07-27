import { useState } from "react";
import { useFormik } from "formik";
import { Message, getOpenAPIMessageFunction } from "../../../utils/useOpenAI";
import Button from "../../../components/Button/Button";
import { TargetMarket, TargetMarketSchema } from "./TargetMarketSchema";
import { targetmarketPrompt } from "./TargetMarketPrompt";

const TargetMarketOverview: React.FC = () => {
  const [items, setItems] = useState<TargetMarket[]>([]);
  const [messages, setMessages] = useState(targetmarketPrompt.initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTargetMarket = async (userInput: string) => {
    const newUserMessage = { role: "user", content: userInput } as Message;
    const messagesRequest = [...messages, newUserMessage];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessageFunction(
        messagesRequest as Message[],
        targetmarketPrompt.functions,
        targetmarketPrompt.functions[0].name
      );
      const resMessage = TargetMarketSchema.parse(JSON.parse(response.content));
      setItems([...items, resMessage]);
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
      userInput: targetmarketPrompt.initialUserInput,
    },
    onSubmit: (values) => {
      handleGetTargetMarket(values.userInput);
    },
  });

  return (
    <>
      {/* form that has a input text field that submits to handlegettargetmarket */}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {targetmarketPrompt.title}
            </h2>
            <Button type="submit">Generate</Button>
          </div>

          <div className="pt-4">
            <input
              className="w-full text-sm rounded-md py-2 px-2 ring-1  ring-slate-200 shadow-sm"
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

      <div className="mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 my-4 bg-slate-100 text-sm rounded-lg shadow-md"
          >
            <h2 className="mb-1 font-medium">{item.description}</h2>

            <div className="flex flex-col">
              <p>
                Age Range: {item.age_range.low} - {item.age_range.high}
              </p>
              <p>Buying Power: {item.buying_power}</p>
              <p>Education Level: {item.education_level}</p>
            </div>
            <div className="flex flex-col">
              <p>Interests: {item.interests.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TargetMarketOverview;
