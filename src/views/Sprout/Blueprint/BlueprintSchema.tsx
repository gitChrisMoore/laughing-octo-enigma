import { z } from "zod";
import { ObjectiveBlueprintSubsetSchema } from "../Objective/ObjectiveSchema";

const ChatViewSchema = z.object({
  role: z.string(),
  content: z.string(),
});

export type ChatView = z.infer<typeof ChatViewSchema>;

export const BlueprintModelSchema = z.object({
  blueprint_id: z.string(),
  blueprint_name: z.string(),
  blueprint_description: z.string(),
  sub_topic_name: z.string(),
  pub_topic_name: z.string(),
  initial_context: ChatViewSchema.array(),
  objectives: ObjectiveBlueprintSubsetSchema.array().optional(),
});

export type BlueprintModel = z.infer<typeof BlueprintModelSchema>;

const BlueprintViewSchema = z.object({
  blueprint_id: z.string(),
  blueprint_name: z.string(),
  blueprint_description: z.string(),
  sub_topic_name: z.string(),
  pub_topic_name: z.string(),
  init_system_chat_messages: z.array(ChatViewSchema),
  init_example_chat_messages: z.array(ChatViewSchema),
  objectives: ObjectiveBlueprintSubsetSchema.array().optional(),
});

export type BlueprintView = z.infer<typeof BlueprintViewSchema>;

export function parseToBlueprintView(
  blueprintModel: BlueprintModel
): BlueprintView {
  let init_system_chat_messages: ChatView[] = [];
  let init_example_chat_messages: ChatView[] = [];

  if (blueprintModel.initial_context.length === 1) {
    init_system_chat_messages = blueprintModel.initial_context
      .slice(0, 1)
      .map((message) => ({
        ...message,
        role: "system",
      }));
    init_example_chat_messages = [];
  } else if (blueprintModel.initial_context.length > 1) {
    init_system_chat_messages = blueprintModel.initial_context
      .slice(0, 1)
      .map((message) => ({
        ...message,
        role: "system",
      }));
    init_example_chat_messages = blueprintModel.initial_context.slice(1);
  } else if (
    !blueprintModel.initial_context ||
    blueprintModel.initial_context.length === 0
  ) {
    init_system_chat_messages = [];
    init_example_chat_messages = [];
  }

  return {
    blueprint_id: blueprintModel.blueprint_id,
    blueprint_name: blueprintModel.blueprint_name,
    blueprint_description: blueprintModel.blueprint_description,
    sub_topic_name: blueprintModel.sub_topic_name,
    pub_topic_name: blueprintModel.pub_topic_name,
    init_system_chat_messages,
    init_example_chat_messages,
    objectives: blueprintModel.objectives,
  };
}

export function parseToBlueprintModelSchema(
  blueprintView: BlueprintView
): BlueprintModel {
  // Combine system chat messages and example chat messages into one array
  const initial_context = [
    ...blueprintView.init_system_chat_messages,
    ...blueprintView.init_example_chat_messages,
  ];

  // Construct and return the BlueprintModel object
  return {
    blueprint_id: blueprintView.blueprint_id,
    blueprint_name: blueprintView.blueprint_name,
    blueprint_description: blueprintView.blueprint_description,
    sub_topic_name: blueprintView.sub_topic_name,
    pub_topic_name: blueprintView.pub_topic_name,
    initial_context: initial_context,
    objectives: blueprintView.objectives,
  };
}
