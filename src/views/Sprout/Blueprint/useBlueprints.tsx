import { useState, useEffect } from "react";
import {
  Blueprint,
  BlueprintSchema,
  BlueprintView,
  parseToBlueprintView,
} from "./BlueprintSchema";

const useBlueprints = (url: string, fetchImpl = fetch) => {
  const [blueprints, setBlueprints] = useState<BlueprintView[]>([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this line

  const handleGetBlueprints = async () => {
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
        const new_problem_solvers: BlueprintView[] = [];
        const res = await response.json();
        for (let i = 0; i < res.length; i++) {
          const blueprintAPI = BlueprintSchema.parse(res[i]);
          console.log(blueprintAPI);
          const blueprintView = parseToBlueprintView(blueprintAPI);
          new_problem_solvers.push(blueprintView);
        }

        setBlueprints(new_problem_solvers);
        console.log(new_problem_solvers);
        setStatus("handleGetBlueprints success");
      } else {
        setStatus(`handleGetBlueprints error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("handleGetBlueprints error");
      console.log(error);
    }
    setIsLoading(false);
  };

  const saveBlueprint = async (newBlueprint: Blueprint) => {
    try {
      const response = await fetchImpl(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify(newBlueprint),
      });

      if (response.status === 200 || response.status === 201) {
        // Re-fetch blueprints or update the state as needed
        handleGetBlueprints();
      } else {
        setStatus(`saveBlueprint error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("saveBlueprint error");
      console.log(error);
    }
  };
  const updateBlueprint = async (id: number, updatedBlueprint: Blueprint) => {
    try {
      const response = await fetchImpl(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify(updatedBlueprint),
      });

      if (response.status === 200) {
        handleGetBlueprints(); // Re-fetch blueprints or update the state as needed
      } else {
        setStatus(`updateBlueprint error, status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("updateBlueprint error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetBlueprints();
  }, [url, fetchImpl]);

  return {
    blueprints,
    status,
    saveBlueprint,
    updateBlueprint,
    isLoading, // Return results as an object
  };
};

export default useBlueprints;
