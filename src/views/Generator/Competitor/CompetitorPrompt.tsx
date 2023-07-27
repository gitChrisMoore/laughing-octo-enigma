import { Message } from "../../../utils/useOpenAI";

const promptContent =
  "Imagine you are a Advisor for the USER who is a CEO. Lookup 10 competitors from what the USER says. No answers should ever show up, that you as the ASSISTANT have already said in the chat. For each, explain the unique value proposition and market position.  ";

export const competitorPrompt = {
  title: "Competitor Generator",
  initialUserInput: "Hartford Insurance Group",
  initialMessages: [
    {
      role: "system",
      content: promptContent,
    },
  ] as Message[],
  functions: [
    {
      name: "save_competitor",
      description: "Save information related to a given obstacle",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "name of the competitor",
          },
          market_position: {
            type: "string",
            description:
              "obstacles or challenges that make it difficult to adapt to macro and industry trends",
          },
          value_prop: {
            type: "string",
            description:
              "Understanding what sets them apart from other players in the market will help you position your own offerings effectively.",
          },
        },
      },
      required: ["title", "description", "value_prop"],
    },
  ],
};
