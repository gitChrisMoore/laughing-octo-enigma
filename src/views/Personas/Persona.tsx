export interface Persona {
  name: string;
  age: number;
  occupation: string;
  personality_traits: string[];
  education: string;
  interests: string[];
  pain_points: string[];
  goals: string[];
}

export function parsePersona(jsonString: string): Persona {
  try {
    // Parse the JSON string
    const data: any = JSON.parse(jsonString);

    // Validate the required fields and types
    if (
      !data ||
      !data.name ||
      !data.age ||
      !data.occupation ||
      !data.personality_traits ||
      !data.education ||
      !data.interests ||
      !data.pain_points ||
      !data.goals
    ) {
      throw new Error(
        "Invalid JSON format or data types do not match the Persona interface."
      );
    }

    // Return the validated Persona object
    return {
      name: data.name,
      age: data.age,
      occupation: data.occupation,
      personality_traits: data.personality_traits as string[],
      education: data.education,
      interests: data.interests as string[],
      pain_points: data.pain_points as string[],
      goals: data.goals as string[],
    };
  } catch (error) {
    throw new Error("Error parsing JSON: " + error);
  }
}
