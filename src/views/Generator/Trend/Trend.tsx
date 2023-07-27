import { Message } from "../../../utils/useOpenAI";

export interface Trend {
  title: string;
  implication: string;
}

const trendDefaultMessages = [
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
] as Message[];

// const trendDefaultMessages = [
//   {
//     role: "system",
//     content:
//       "You are a helpful assistant that helps consultants generate market trends. " +
//       "When a consultant submits a topic, you will generate a market trend based on the industry or market. " +
//       "Your response should be concise and unique. " +
//       "The title should be a short, punchy description of the overall trend. " +
//       "The implication should be two sentances, and describe examples." +
//       "You should not repeat. ",
//   },
//   {
//     role: "user",
//     content: "Software Quality Engineering",
//   },
//   {
//     role: "assissant",
//     content:
//       "Title: DevQualOps. Implication: The recent focus on fast, iterative releases has led to increased tech debt, agile burnout, and scalability issues. DevQualOps emerges as a solution which places more emphasis on integrating quality management and stakeholder expectations into the development process.",
//   },
// ] as Message[];

const trendMessageFunctions = [
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
];

function parseTrend(jsonString: string): Trend {
  try {
    // Parse the JSON string
    const data: any = JSON.parse(jsonString);

    // Validate the required fields and types
    if (!data || !data.title || !data.implication) {
      throw new Error(
        "Invalid JSON format or data types do not match the WirelessCharging interface."
      );
    }

    // Return the validated WirelessCharging object
    return {
      title: data.title,
      implication: data.implication,
    };
  } catch (error) {
    throw new Error("Error parsing JSON: " + error);
  }
}

const TrendListItem: React.FC<{ marketTrend: Trend }> = ({ marketTrend }) => {
  return (
    <div className="flex flex-col p-4 text-sm rounded-lg shadow-md">
      <h2 className="mb-1 font-medium">{marketTrend.title}</h2>
      <p className="mb-2">{marketTrend.implication}</p>
    </div>
  );
};

export {
  trendDefaultMessages,
  trendMessageFunctions,
  TrendListItem,
  parseTrend,
};
