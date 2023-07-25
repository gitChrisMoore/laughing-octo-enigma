import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_SOME_KEY,
});

const openai = new OpenAIApi(configuration);

export { openai };
