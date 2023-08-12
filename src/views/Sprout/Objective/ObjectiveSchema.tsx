import { z } from "zod";

const BasePropertySchema = z.record(
  z.object({
    type: z.string(),
    description: z.string().optional(),
    items: z
      .object({
        type: z.string(),
        description: z.string().optional(),
      })
      .optional(),
  })
);

export const ObjectiveSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  parameters: z.object({
    type: z.string(),
    properties: BasePropertySchema,
  }),
});

export type Objective = z.infer<typeof ObjectiveSchema>;

const Field = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
});

const ObjectiveFESchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  parameters: z.array(Field),
});

export type ObjectiveFE = z.infer<typeof ObjectiveFESchema>;

export const ObjectiveBlueprintSubsetSchema = z.object({
  objective_id: z.string(),
});

export function parseObjectiveToObjectiveFE(objective: Objective): ObjectiveFE {
  const parameters = Object.entries(objective.parameters.properties).map(
    ([name, value]) => {
      return {
        type: value.type,
        name: name,
        description: value.description,
      };
    }
  );

  return {
    description: objective.description,
    id: objective.id,
    name: objective.name,
    parameters: parameters,
  };
}

export function parseObjectiveFEToObjective(
  objectiveFE: ObjectiveFE
): Objective {
  const properties: Record<
    string,
    { type: string; description?: string | undefined }
  > = {};
  objectiveFE.parameters.forEach((param) => {
    properties[param.name] = {
      type: param.type,
      description: param.description,
    };
  });

  return {
    id: objectiveFE.id,
    name: objectiveFE.name,
    description: objectiveFE.description,
    parameters: {
      type: "object", // Assuming 'type' is always 'object'; modify as needed
      properties: properties,
    },
  };
}
