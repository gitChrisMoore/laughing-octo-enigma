import { ChatCompletionFunctions } from "openai";
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

const getOpenAPIMessageFunction = async (
  messages: Message[],
  functions: ChatCompletionFunctions[],
  function_name: string
) => {
  // console log the const name and the list of messages
  console.log("getOpenAPIMessageFunction messages: ", messages);
  console.log("getOpenAPIMessageFunction functions: ", functions);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    functions: functions,
    function_call: {
      name: function_name,
    },
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0.8,
  });

  // if response.data.choices[0].message.content does not exist or is undefined, throw error
  if (!response.data.choices[0].message?.function_call) {
    throw new Error("No function_call message generated.");
  }

  // of response.data.choices[0].message?.content return it as a Message
  return {
    role: "assistant",
    content: response.data.choices[0].message.function_call.arguments,
  } as Message;
};

export { getOpenAPIMessage, getOpenAPIMessageFunction };
