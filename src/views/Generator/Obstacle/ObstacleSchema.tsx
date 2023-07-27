import { z } from "zod";

export const ObstacleSchema = z.object({
  title: z.string(),
  description: z.string()
});


export type Obstacle = z.infer<typeof ObstacleSchema>;
