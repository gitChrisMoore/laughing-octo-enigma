import { useState, useEffect } from "react";
import {
  BlueprintModelSchema,
  BlueprintView,
  parseToBlueprintModelSchema,
  parseToBlueprintView,
} from "./BlueprintSchema";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BLUEPRINTS_URI = VITE_API_BASE_URL + "/api/blueprints/";

const useBlueprints = (url: string = BLUEPRINTS_URI, fetchImpl = fetch) => {
  const [blueprints, setBlueprints] = useState<BlueprintView[]>([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this line

  console.log(url);

  const getBlueprint = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetchImpl(url + `${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        const res = await response.json();
        console.log(res);
        const blueprintAPI = BlueprintModelSchema.parse(res);
        const blueprintView = parseToBlueprintView(blueprintAPI);
        setStatus("handleGetProblemSolver success");
        return blueprintView;
      } else {
        setStatus(
          `handleGetProblemSolver error, status code: ${response.status}`
        );
      }
    } catch (error) {
      setStatus("handleGetProblemSolver error");
      console.log(error);
    }
    setIsLoading(false);
  };

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
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          const blueprintAPI = BlueprintModelSchema.parse(res[i]);
          const blueprintView = parseToBlueprintView(blueprintAPI);
          new_problem_solvers.push(blueprintView);
        }

        setBlueprints(new_problem_solvers);
        // console.log(new_problem_solvers);
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

  useEffect(() => {
    handleGetBlueprints();
  }, [url, fetchImpl]);

  const updateBlueprint = async (blueprintViewToUpdate: BlueprintView) => {
    setIsLoading(true);
    try {
      // Convert the BlueprintView object to the expected API format (BlueprintModel)
      const blueprintAPI = parseToBlueprintModelSchema(blueprintViewToUpdate);

      const response = await fetchImpl(url + `${blueprintAPI.blueprint_id}`, {
        method: "PUT", // Assuming you use a PUT request to update the resource
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
        body: JSON.stringify(blueprintAPI), // Send the BlueprintModel object as JSON
      });

      if (response.status === 200) {
        const res = await response.json();
        const blueprintAPI = BlueprintModelSchema.parse(res);
        const blueprintView = parseToBlueprintView(blueprintAPI);
        setStatus("handleUpdateBlueprint success");
        setIsLoading(false);
        return blueprintView;
      } else {
        setStatus(
          `handleUpdateBlueprint error, status code: ${response.status}`
        );
      }
    } catch (error) {
      setStatus("handleUpdateBlueprint error");
      console.log(error);
    }
    setIsLoading(false);
  };

  return {
    blueprints,
    status,
    getBlueprint,
    // saveBlueprint,
    updateBlueprint,
    isLoading, // Return results as an object
  };
};

export default useBlueprints;
