import { useState } from "react";
import { useFormik } from "formik";
import { Message, getOpenAPIMessageFunction } from "../../../utils/useOpenAI";
import Button from "../../../components/Button/Button";
import { Persona, PersonaSchema } from "./PersonaSchema";
import { personaPrompt } from "./PersonaPrompt";

const PersonaOverview: React.FC = () => {
  const [items, setItems] = useState<Persona[]>([]);
  const [messages, setMessages] = useState(personaPrompt.initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const newUserMessage = { role: "user", content: userInput } as Message;
    const messagesRequest = [...messages, newUserMessage];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessageFunction(
        messagesRequest as Message[],
        personaPrompt.functions,
        personaPrompt.functions[0].name
      );
      const resMessage = PersonaSchema.parse(JSON.parse(response.content));
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
      userInput: personaPrompt.initialUserInput,
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
              {personaPrompt.title}
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
            <h2 className="mb-1 font-medium">{item.name}</h2>

            <div className="flex flex-col">
              <p>Age: {item.age}</p>
              <p>Occupation: {item.occupation}</p>
              <p>Education: {item.education}</p>
            </div>
            <div className="flex flex-col">
              <p>Personality Traits: {item.personality_traits.join(", ")}</p>
              <p>Interests: {item.interests.join(", ")}</p>
              <p>Pain Points: {item.pain_points.join(", ")}</p>
              <p>Goals: {item.goals.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PersonaOverview;
