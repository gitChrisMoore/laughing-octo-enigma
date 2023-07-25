import { useEffect, useState } from "react";
import { openai } from "./openai";

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
export const userPersonaFetch = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant and should respond in valid json. include name as string, age as int, occupation as string, personality traits as a list of strings, education as string, interests as list of strings, pain_points as list of strings, and goals as list of strings. ",
          },
          { role: "user", content: "Generate a persona" },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.2,
      });

      // if response.data.choices[0].message?.content then parse persona
      if (response.data.choices[0].message?.content) {
        const persona = parsePersona(response.data.choices[0].message.content);
        setData(persona);
      } else {
        throw new Error("No persona generated.");
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, error, loading] as const;
};
