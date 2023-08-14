import { useState, useEffect } from "react";
import {
  Objective,
  ObjectiveFE,
  ObjectiveSchema,
  parseObjectiveToObjectiveFE,
} from "./ObjectiveSchema";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OBJECTIVES_URI = VITE_API_BASE_URL + "/api/objectives/";

const useGetObjectives = (url: string = OBJECTIVES_URI, fetchImpl = fetch) => {
  const [objectives, setObjectives] = useState<ObjectiveFE[]>([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this line

  const handleGetObjectives = async () => {
    setIsLoading(true);
    try {
      const response = await fetchImpl(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        const new_problem_solvers: ObjectiveFE[] = [];
        const res = await response.json();
        for (let i = 0; i < res.length; i++) {
          const objectiveAPI = ObjectiveSchema.parse(res[i]);
          const objectiveFE = parseObjectiveToObjectiveFE(objectiveAPI);
          new_problem_solvers.push(objectiveFE);
        }

        setObjectives(new_problem_solvers);
        setStatus("handleGetObjectives success");
      } else {
        setStatus(`handleGetObjectives error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("handleGetObjectives error");
      console.log(error);
    }
    setIsLoading(false);
  };

  const saveObjective = async (newObjective: Objective) => {
    try {
      const response = await fetchImpl(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify(newObjective),
      });

      if (response.status === 200 || response.status === 201) {
        // Re-fetch objectives or update the state as needed
        handleGetObjectives();
      } else {
        setStatus(`saveObjective error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("saveObjective error");
      console.log(error);
    }
  };
  const updateObjective = async (id: number, updatedObjective: Objective) => {
    try {
      const response = await fetchImpl(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify(updatedObjective),
      });

      if (response.status === 200) {
        handleGetObjectives(); // Re-fetch objectives or update the state as needed
      } else {
        setStatus(`updateObjective error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("updateObjective error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetObjectives();
  }, [url, fetchImpl]);

  return {
    objectives,
    status,
    saveObjective,
    updateObjective,
    isLoading, // Return results as an object
  };
};

export default useGetObjectives;
