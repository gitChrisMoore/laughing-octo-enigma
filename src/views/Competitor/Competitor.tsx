export interface Competitor {
  competitor_name: string;
  industry: string;
  specialization: string;
  strengths: string[];
  strategies: string[];
}

export function parseCompetitor(jsonString: string): Competitor {
  try {
    // Parse the JSON string
    const data: any = JSON.parse(jsonString);
    console.log(data);

    // Validate the required fields and types
    if (
      !data ||
      !data.competitor_name ||
      !data.industry ||
      !Array.isArray(data.strengths) ||
      !data.strengths.every((strength: any) => typeof strength === "string") ||
      !Array.isArray(data.strategies) ||
      !data.strategies.every((strategy: any) => typeof strategy === "string")
    ) {
      throw new Error(
        "Invalid JSON format or data types do not match the Competitor interface."
      );
    }

    // Return the validated Competitor object
    return {
      competitor_name: data.competitor_name,
      industry: data.industry,
      specialization: data.specialization,
      strengths: data.strengths,
      strategies: data.strategies,
    };
  } catch (error) {
    throw new Error("Error parsing JSON: " + error);
  }
}
