import { Message } from "../../../utils/useOpenAI";

export const personaPrompt = {
  title: "Persona Generator",
  initialUserInput: "Generate a persona",
  initialMessages: [
    {
      role: "system",
      content:
        "You are a helpful assistant, and responsable for coming up with personas.  " +
        "Each persona should be unique." +
        "Your job is to provide a concise and unique response. ",
    },
  ] as Message[],
  functions: [
    {
      name: "save_persona",
      description: "Save information related to a given persona",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "frieldy name of the persona",
          },
          age: {
            type: "number",
            description: "age of the persona",
          },
          occupation: {
            type: "string",
            description: "occupation of the persona",
          },
          personality_traits: {
            type: "array",
            items: {
              type: "string",
              description: "personality traits of the persona",
            },
          },
          education: {
            type: "string",
            description: "education of the persona",
          },
          interests: {
            type: "array",
            items: {
              type: "string",
              description: "interests of the persona",
            },
          },
          pain_points: {
            type: "array",
            items: {
              type: "string",
              description: "pain points of the persona",
            },
          },
          goals: {
            type: "array",
            items: {
              type: "string",
              description: "goals of the persona",
            },
          },
        },
      },
      required: [
        "name",
        "age",
        "occupation",
        "personality_traits",
        "education",
        "interests",
        "pain_points",
        "goals",
      ],
    },
  ],
};
