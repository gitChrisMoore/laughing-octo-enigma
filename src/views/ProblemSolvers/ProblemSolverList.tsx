import { useEffect, useState } from "react";
import { ProblemSolver, ProblemSolverSchema } from "./ProblemSolverSchema";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import ReactJson from "react-json-view";

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

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}

      <div>
        <h1>Problem Solvers</h1>
        <div>
          <Button onClick={() => navigate("/problem-solver-overview/create")}>
            Add New Problem Solver
          </Button>
        </div>
        <div className="flex flex-col overflow-auto py-2 text-xs">
          {problemSolvers.map((item, index) => (
            <div key={index} className="py-2">
              <div>
                <p className="whitespace-pre-line">{item.name}</p>
              </div>

              <div>
                <p className="whitespace-pre-line">{item.pub_topic_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs p-4 rounded-lg bg-slate-300">
        {problemSolvers[0] && (
          <ReactJson
            src={problemSolvers[0].functions[0]}
            name={false}
            displayDataTypes={false}
            onEdit={(edit) => {
              console.log(edit);
            }}
            onAdd={(add) => {
              console.log(add);
            }}
            // theme={"monokai"}
            onDelete={(del) => {
              console.log(del);
            }}
            enableClipboard={false}
          />
        )}
      </div>
    </>
  );
};

export default ProblemSolverList;
