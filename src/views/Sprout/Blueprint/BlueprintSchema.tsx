import { z } from "zod";

export const FunctionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.any(),
});

export const ConversationalMessage = z.object({
  role: z.string(),
  content: z.string(),
});

export const BlueprintSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  sub_topic_name: z.string(),
  pub_topic_name: z.string(),
  initial_context: ConversationalMessage.array(),
  functions: FunctionSchema.array(),
});

export type Blueprint = z.infer<typeof BlueprintSchema>;

const ChatViewSchema = z.object({
  role: z.string(),
  content: z.string(),
});

export type ChatView = z.infer<typeof ChatViewSchema>;

export const BlueprintModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  sub_topic_name: z.string(),
  pub_topic_name: z.string(),
  initial_context: ChatViewSchema.array(),
});

export type BlueprintModel = z.infer<typeof BlueprintModelSchema>;

const BlueprintViewSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  sub_topic_name: z.string(),
  pub_topic_name: z.string(),
  init_system_chat_messages: z.array(ChatViewSchema),
  init_example_chat_messages: z.array(ChatViewSchema),
  objective_ids: z.array(z.string()).optional(),
});

export type BlueprintView = z.infer<typeof BlueprintViewSchema>;

export function parseToBlueprintView(
  blueprintModel: BlueprintModel
): BlueprintView {
  let init_system_chat_messages: ChatView[] = [];
  let init_example_chat_messages: ChatView[] = [];

  console.log("blueprint length, ", blueprintModel.initial_context.length);
  if (blueprintModel.initial_context.length === 1) {
    // Assign the first message to init_system_chat_messages and an empty string to init_example_chat_messages
    init_system_chat_messages = blueprintModel.initial_context
      .slice(0, 1)
      .map((message) => ({
        ...message,
        role: "system", // Set the role to "system" as instructed
      }));
    init_example_chat_messages = [];
  } else if (blueprintModel.initial_context.length > 1) {
    // Assign the first message to init_system_chat_messages and the rest of the messages to init_example_chat_messages
    init_system_chat_messages = blueprintModel.initial_context
      .slice(0, 1)
      .map((message) => ({
        ...message,
        role: "system", // Set the role to "system" as instructed
      }));
    init_example_chat_messages = blueprintModel.initial_context.slice(1);
  } else if (
    !blueprintModel.initial_context ||
    blueprintModel.initial_context.length === 0
  ) {
    // Assign empty arrays to both init_system_chat_messages and init_example_chat_messages
    init_system_chat_messages = [];
    init_example_chat_messages = [];
  }

  // Return the BlueprintView object
  return {
    id: blueprintModel.id,
    name: blueprintModel.name,
    description: blueprintModel.description,
    sub_topic_name: blueprintModel.sub_topic_name,
    pub_topic_name: blueprintModel.pub_topic_name,
    init_system_chat_messages,
    init_example_chat_messages,
    objective_ids: [],
  };
}
