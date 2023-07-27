import { z } from "zod";

export const PersonaSchema = z.object({
  name: z.string(),
  age: z.number(),
  occupation: z.string(),
  personality_traits: z.array(z.string()),
  education: z.string(),
  interests: z.array(z.string()),
  pain_points: z.array(z.string()),
  goals: z.array(z.string()),
});

export type Persona = z.infer<typeof PersonaSchema>;
