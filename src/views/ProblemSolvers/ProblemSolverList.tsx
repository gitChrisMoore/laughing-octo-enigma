import { useEffect, useState } from "react";
import { ProblemSolver, ProblemSolverSchema } from "./ProblemSolverSchema";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import TwoLineListItem from "../../components/ListItems/TwoLineListItem";

const PROBLEM_SOLVERS_URI = "/api/crud_problem_solvers/";

const ProblemSolverList: React.FC = () => {
  const [problemSolvers, setProblemSolvers] = useState<ProblemSolver[]>([]);
  const navigate = useNavigate();

  const handleGetProblemSolvers = async () => {
    try {
      const response = await fetch(PROBLEM_SOLVERS_URI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        const new_problem_solvers = [];
        const res = await response.json();
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          const problemSolver = ProblemSolverSchema.parse(res[i]);
          new_problem_solvers.push(problemSolver);
        }

        setProblemSolvers(new_problem_solvers);
        console.log("status: handleGetProblemSolvers success");
      } else {
        console.log("status: handleGetProblemSolvers error");
        console.log(response.status);
      }
    } catch (error) {
      console.log("status: handleGetProblemSolvers error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProblemSolvers();
  }, []);

  const headline = "Blueprints";
  const supportingText = `
  These for AI are like blueprints for a building, instructing how it should  should behave. Similar to how blueprints define the structure of a building, these configs outline the specific instructions for AI interactions and conversations.
  `;

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}

      <div className="flex flex-col">
        <PageHeader headline={headline} supportingText={supportingText} />
        <p className="text-base text-med mt-2 ">Existing Blueprints:</p>
        {problemSolvers.map((item, index) => (
          <div key={index} className="py-2">
            <TwoLineListItem
              headline={item.name}
              supportingText={item.description}
            />
          </div>
        ))}

        <button
          onClick={() => navigate("/problem-solver-overview/create")}
          className="bg-slate-500 w-full text-white rounded-full justify-center items-center"
        >
          <p className="m-2 text-center text-sm">Add Blueprint </p>
        </button>
      </div>
    </>
  );
};

export default ProblemSolverList;
