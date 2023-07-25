export interface TargetMarket {
  age_range: {
    low: number;
    high: number;
  };
  description: string;
  buying_power: string;
  education_level: string;
  interests: string[];
}

export function parseTargetMarket(jsonString: string): TargetMarket {
  try {
    // Parse the JSON string
    const data: any = JSON.parse(jsonString);
    console.log(data);

    // Validate the required fields and types
    if (
      !data ||
      typeof data.age_range !== "object" ||
      typeof data.age_range.low !== "number" ||
      typeof data.age_range.high !== "number" ||
      typeof data.description !== "string" ||
      typeof data.buying_power !== "string" ||
      typeof data.education_level !== "string" ||
      !Array.isArray(data.interests) ||
      !data.interests.every((interest: any) => typeof interest === "string")
    ) {
      console.log(data);
      throw new Error(
        "Invalid JSON format or data types do not match the TargetMarket interface."
      );
    }

    // Return the validated TargetMarket object
    return {
      age_range: {
        low: data.age_range.low,
        high: data.age_range.high,
      },
      description: data.description,
      buying_power: data.buying_power,
      education_level: data.education_level,
      interests: data.interests,
    };
  } catch (error) {
    throw new Error("Error parsing JSON: " + error);
  }
}
