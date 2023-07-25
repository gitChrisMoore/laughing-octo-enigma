export interface MarketingMessage {
  slogan: string;
  description: string;
  call_to_action: string;
  unique_selling_point: string;
  features: string[];
  target_audiences: string[];
}

export function parseMarketingMessage(jsonString: string): MarketingMessage {
  try {
    // Parse the JSON string
    console.log(jsonString);
    const data: any = JSON.parse(jsonString);

    // Validate the required fields and types
    if (
      !data ||
      !data.slogan ||
      !data.description ||
      !data.call_to_action ||
      !data.unique_selling_point ||
      !Array.isArray(data.features) ||
      !data.features.every((feature: string) => typeof feature === "string") ||
      !Array.isArray(data.target_audiences) ||
      !data.target_audiences.every(
        (audience: string) => typeof audience === "string"
      )
    ) {
      throw new Error(
        "Invalid JSON format or data types do not match the MarketingMessage interface."
      );
    }

    // Return the validated MarketingMessage object
    return {
      slogan: data.slogan,
      description: data.description,
      call_to_action: data.call_to_action,
      unique_selling_point: data.unique_selling_point,
      features: data.features,
      target_audiences: data.target_audiences,
    };
  } catch (error) {
    throw new Error("Error parsing JSON: " + error);
  }
}
