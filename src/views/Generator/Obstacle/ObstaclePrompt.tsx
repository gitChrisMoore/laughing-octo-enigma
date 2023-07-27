import { Message } from "../../../utils/useOpenAI";

export const obstaclePrompt = {
  title: "Obstacle Generator",
  initialUserInput: "Software quality engineering",
  initialMessages: [
    {
      role: "system",
      content:
        "Imagine you are a Advisor for the USER who is a CEO.  " +
        "Lookup 10 obstacle's from what the USER says." +
        "The CEO wants to understand what obstacles or challenges that will make it difficult to adapt to trends in the industry. " +
        "Your job is to provide a concise and unique response. ",
    },
    // {
    //   role: "user",
    //   content: "Software Quality Engineering",
    // },
    // {
    //   role: "assistant",
    //   content:
    //     "Title: Rapid pace of technological advancements. Description: New tools, frameworks, and methodologies are constantly being developed, making it challenging for organizations to keep up. This creates a need for continuous learning and staying current with the latest trends.",
    // },
  ] as Message[],
  functions: [
    {
      name: "save_obstacle",
      description: "Save information related to a given obstacle",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "frieldy name of the obstacle",
          },
          description: {
            type: "string",
            description:
              "obstacles or challenges that make it difficult to adapt to macro and industry trends",
          },
        },
      },
      required: ["title", "description"],
    },
  ],
};
