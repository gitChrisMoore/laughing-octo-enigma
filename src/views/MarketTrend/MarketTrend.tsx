export interface MarketTrend {
  trend: string;
  description: string;
  implications: string[];
  leading_companies: string[];
  opportunities: string[];
}

export function parseMarketTrend(jsonString: string): MarketTrend {
  try {
    // Parse the JSON string
    const data: any = JSON.parse(jsonString);

    // Validate the required fields and types
    if (
      !data ||
      !data.trend ||
      !data.description ||
      !Array.isArray(data.implications) ||
      !data.implications.every(
        (implication: any) => typeof implication === "string"
      ) ||
      !Array.isArray(data.leading_companies) ||
      !data.leading_companies.every(
        (company: any) => typeof company === "string"
      ) ||
      !Array.isArray(data.opportunities) ||
      !data.opportunities.every(
        (opportunity: any) => typeof opportunity === "string"
      )
    ) {
      throw new Error(
        "Invalid JSON format or data types do not match the WirelessCharging interface."
      );
    }

    // Return the validated WirelessCharging object
    return {
      trend: data.trend,
      description: data.description,
      implications: data.implications,
      leading_companies: data.leading_companies,
      opportunities: data.opportunities,
    };
  } catch (error) {
    throw new Error("Error parsing JSON: " + error);
  }
}
