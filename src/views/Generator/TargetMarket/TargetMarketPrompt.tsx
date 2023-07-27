import { Message } from "../../../utils/useOpenAI";

export const targetmarketPrompt = {
  title: "TargetMarket Generator",
  initialUserInput: "Generate a Target Market",
  initialMessages: [
    {
      role: "system",
      content:
        "You are a helpful assistant, and responsable for coming up with targetmarkets.  " +
        "Come up with unique descriptions, age ranges, buying power, education level, and interests. " +
        "Each target market should be unique." +
        "Your job is to provide a concise and unique response. ",
    },
  ] as Message[],
  functions: [
    {
      name: "save_targetmarket",
      description: "Save information related to a given targetmarket",
      parameters: {
        type: "object",
        properties: {
          age_range: {
            type: "object",
            properties: {
              low: {
                type: "number",
                description: "low age of the targetmarket",
              },
              high: {
                type: "number",
                description: "high age of the targetmarket",
              },
            },
          },
          description: {
            type: "string",
            description: "description of the targetmarket",
          },
          buying_power: {
            type: "string",
            description: "buying power of the targetmarket",
          },
          education_level: {
            type: "string",
            description: "education level of the targetmarket",
          },
          interests: {
            type: "array",
            items: {
              type: "string",
              description: "interests of the targetmarket",
            },
          },
        },
      },
      required: [
        "age_range",
        "description",
        "buying_power",
        "education_level",
        "interests",
      ],
    },
  ],
};
