import { useState } from "react";

const usePostUserEvent = (api: string, funcName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (userInput: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify({
          role: "user",
          content: userInput,
          source_id: "front-end",
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setResponse(data);
        console.log(`component: ${funcName} status: handleSubmit success`);
      } else {
        const error = await response.text();
        console.log(`component: ${funcName} status: handleSubmit error`);
        setError(new Error(error));
      }
    } catch (error: any) {
      console.log(`component: ${funcName} status: handleSubmit error`);
      setError(new Error(error.message || "An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, response };
};

export default usePostUserEvent;
