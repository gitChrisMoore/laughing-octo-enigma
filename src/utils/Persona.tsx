import { useState } from "react";
import { getOpenAPIMessage, Message } from "./useOpenAI";
import { useFormik } from "formik";

type Persona = {
  name: string;
  age: number;
  occupation: string;
  personality_traits: string[];
  education: string;
  interests: string[];
  pain_points: string[];
  goals: string[];
};

const defaultMessages = [
  {
    role: "system",
    content:
      "You are a helpful assistant and should respond always in valid json. " +
      "name, occupation, and education should be strings. " +
      "age should be a number." +
      "personality_traits, interests, pain_points, and goals should be lists of strings. " +
      "Each persona should be unique.",
  },
] as Message[];

function parsePersona(jsonString: string): Persona {
  const person = JSON.parse(jsonString);
  // Ensure that the object has the correct properties.
  const expectedProperties = [
    "name",
    "age",
    "occupation",
    "personality_traits",
    "education",
    "interests",
    "pain_points",
    "goals",
  ];
  for (const property of expectedProperties) {
    if (!person.hasOwnProperty(property)) {
      throw new Error(
        `The JSON string does not have the property "${property}".`
      );
    }
  }
  return person;
}

// PersonaCard component that can display a list of personas
const PersonaCard: React.FC<{ persona: Persona }> = ({ persona }) => {
  return (
    <div className=" ">
      <h2>{persona.name}</h2>
      <p>Age: {persona.age}</p>
      <p>Occupation: {persona.occupation}</p>
      <p>Education: {persona.education}</p>
      <p>Personality Traits: {persona.personality_traits.join(", ")}</p>
      <p>Interests: {persona.interests.join(", ")}</p>
      <p>Pain Points: {persona.pain_points.join(", ")}</p>
      <p>Goals: {persona.goals.join(", ")}</p>
    </div>
  );
};

const PersonaComponent: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [messages, setMessages] = useState(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPersona = async (userInput: string) => {
    const messagesRequest = [...messages, { role: "user", content: userInput }];

    setIsLoading(true);
    try {
      const response = await getOpenAPIMessage(messagesRequest as Message[]);
      const persona = parsePersona(response.content);
      setPersonas([...personas, persona]);
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
      userInput: "Generate a unique persona",
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
            <h2 className="font-semibold text-slate-900">Persona Generator</h2>
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

      {/* maps over personas and displays them all as cards */}
      {personas.map((persona, index) => (
        <div key={index}>
          <PersonaCard persona={persona} />
        </div>
      ))}
    </>
  );
};

export default PersonaComponent;
