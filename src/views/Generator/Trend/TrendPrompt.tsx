import { Message } from "../../../utils/useOpenAI";

export const trendPrompt = {
  title: "Trend Generator",
  initialUserInput: "Software quality engineering",
  initialMessages: [
    {
      role: "system",
      content:
        "You are a helpful assistant that helps consultants generate market trends. " +
        "When a consultant submits a topic, you will generate a market trend based on the industry or market. " +
        "Your response should be concise and unique. " +
        "The title should be a short, punchy description of the overall trend. " +
        "The implication should be two sentances, and describe examples." +
        "You should not repeat. ",
    },
    {
      role: "user",
      content: "Software Quality Engineering",
    },
    {
      role: "assistant",
      content:
        "Title: DevQualOps. Implication: The recent focus on fast, iterative releases has led to increased tech debt, agile burnout, and scalability issues. DevQualOps emerges as a solution which places more emphasis on integrating quality management and stakeholder expectations into the development process.",
    },
  ] as Message[],
  functions: [
    {
      name: "save_market_trend",
      description: "Save information related to a given market trend",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "frieldy name of the market trend",
          },
          implication: {
            type: "string",
            description:
              "Inference of what the market trend means to the industry",
          },
        },
      },
      required: ["title", "implication"],
    },
  ],
};
