import { useEffect, useState } from "react";
import { ProblemSolver, ProblemSolverSchema } from "./ProblemSolverSchema";
import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const PROBLEM_SOLVERS_URI = "/api/crud_problem_solvers/";

const ProblemSolverCreate: React.FC = () => {
  const [problemSolvers, setProblemSolvers] = useState<ProblemSolver[]>([]);
  const navigate = useNavigate();

  const handleCreate = async (formInput: ProblemSolver) => {
    try {
      const response = await fetch(PROBLEM_SOLVERS_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
      });
      const data = await response.json();
      setProblemSolvers([...problemSolvers, data]);
      navigate("/problem-solver-overview");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const formik = useFormik({
    initialValues: {
      id: 8,
      name: "new_problem_solver_8",
      sub_topic_name: "strategy-market_obsticle-general",
      pub_topic_name: "strategy-market_obsticle-typed",
      initial_context: [
        {
          role: "system",
          content:
            "You are a helpful assistant, and responsable for coming up with personas.  Each persona should be unique.  Your job is to provide a concise and unique response. ",
        },
      ],
      functions: [
        {
          name: "save_persona",
          description: "parse and structure data in the form of a persona",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "frieldy name of the persona",
              },
              age: {
                type: "number",
                description: "age of the persona",
              },
            },
            required: ["name", "age"],
          },
        },
      ],
    },
    onSubmit: handleCreate,
  });

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}

      <div>
        <h1>Create Problem Solver</h1>
        <div className="flex flex-col overflow-auto py-2 text-xs">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>

            <input
              className="w-full text-sm rounded-md py-2 px-2 ring-1  ring-slate-200 shadow-sm"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label htmlFor="sub_topic_name">Sub Topic Name</label>
            <input
              className="w-full text-sm rounded-md py-2 px-2 ring-1  ring-slate-200 shadow-sm"
              id="sub_topic_name"
              name="sub_topic_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.sub_topic_name}
            />
            <label htmlFor="pub_topic_name">Pub Topic Name</label>
            <input
              className="w-full text-sm rounded-md py-2 px-2 ring-1  ring-slate-200 shadow-sm"
              id="pub_topic_name"
              name="pub_topic_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.pub_topic_name}
            />
            <label htmlFor="initial_context">Initial Context</label>
            <div>TODO Implement</div>
            <label htmlFor="initial_context">Functions</label>
            <div>TODO Implement</div>

            <Button type="submit">Create</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProblemSolverCreate;
