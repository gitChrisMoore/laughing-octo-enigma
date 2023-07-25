import { openai } from "./openai";

export enum ChatCompletionRequestMessageRoleEnum {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export interface Message {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}

const getOpenAPIMessage = async (messages: Message[]) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.2,
  });

  // if response.data.choices[0].message.content does not exist or is undefined, throw error
  if (!response.data.choices[0].message?.content) {
    throw new Error("No message generated.");
  }

  // of response.data.choices[0].message?.content return it as a Message
  return response.data.choices[0].message as Message;
};

export { getOpenAPIMessage };
