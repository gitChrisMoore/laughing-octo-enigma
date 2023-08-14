import { useState, useEffect } from "react";
import { Thread, ThreadSchema } from "./AdminSchema";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BLUEPRINTS_URI = VITE_API_BASE_URL + "/api/admin";

const useAdmin = (url: string = BLUEPRINTS_URI, fetchImpl = fetch) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetThreads = async () => {
    setIsLoading(true);
    try {
      const response = await fetchImpl(url + "/threads_status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        const new_threads: Thread[] = [];
        const res = await response.json();

        for (let i = 0; i < res.length; i++) {
          const res_thread = ThreadSchema.parse(res[i]);
          new_threads.push(res_thread);
        }

        setThreads(new_threads);
        setStatus("handleGetThreads success");
      } else {
        setStatus(`handleGetThreads error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("handleGetThreads error");
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetThreads();
  }, [url, fetchImpl]);

  const resetDatabase = async () => {
    try {
      const response = await fetch(url + "/reset_database", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        console.log("status: handleResetDatabase success");
      } else {
        console.log("status: handleResetDatabase error");
        console.log(response.status);
      }
    } catch (error) {
      console.log("status: handleResetDatabase error");
      console.log(error);
    }
  };

  return {
    threads,
    status,
    isLoading,
    resetDatabase,
  };
};

export default useAdmin;
