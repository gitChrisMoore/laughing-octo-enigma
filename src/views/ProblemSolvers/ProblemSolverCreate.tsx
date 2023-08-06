import { useEffect, useState } from "react";
import { ProblemSolver, ProblemSolverSchema } from "./ProblemSolverSchema";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import IconLayoutNavbarExpand from "../../components/Icons/IconLayoutNavbarExpand";
import IconLayoutBottombarExpand from "../../components/Icons/IconLayoutBottombarExpand";

const PROBLEM_SOLVERS_URI = "/api/crud_problem_solvers/";

const initialValues = {
  id: 8,
  name: "new_problem_solver_8",
  description: "new_problem_solver_8",
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
};

const BlueprintCreateForm: React.FC = () => {
  const [problemSolvers, setProblemSolvers] = useState<ProblemSolver[]>([]);
  const [isAdvancedInputShown, setIsAdvancedInputShown] = useState(false);
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

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}

      <Formik initialValues={initialValues} onSubmit={handleCreate}>
        <Form>
          <div className="mb-4">
            <div className="pb-1">
              <label htmlFor="name">Name</label>
            </div>
            <Field
              className="flex flex-row w-full sm:w-80 text-sm rounded-md p-2 ring-1  ring-slate-200 shadow-sm"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center  ">
            <button
              className=" text-secondary px-2 py-2 rounded"
              onClick={() => setIsAdvancedInputShown(!isAdvancedInputShown)}
            >
              {isAdvancedInputShown ? (
                <IconLayoutNavbarExpand />
              ) : (
                <IconLayoutBottombarExpand />
              )}
            </button>
            {/* align text in vertical middle */}
            <p className="inline-block align-middle">Advanced config</p>
            {/* <p className=" ">asdasd</p> */}
          </div>
          <div className={`${isAdvancedInputShown ? "block" : "hidden"}`}>
            <div className="mb-4">
              <div>
                <label htmlFor="name">Subscribe to</label>
              </div>
              <Field
                className="flex flex-row w-64 text-sm rounded-md p-2 ring-1  ring-slate-200 shadow-sm"
                name="sub_topic_name"
                placeholder="sub_topic_name"
              />
            </div>
            <div className="mb-4">
              <div className="pb-1">
                <label htmlFor="name">Publish to</label>
              </div>
              <Field
                className="flex flex-row w-64 text-sm rounded-md p-2 ring-1  ring-slate-200 shadow-sm"
                name="pub_topic_name"
                placeholder="pub_topic_name"
              />
            </div>
          </div>
          <button className="w-full bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center">
            <p className="m-2 text-center text-sm">Submit </p>
          </button>
        </Form>
      </Formik>

      {/* <div>
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
      </div> */}
    </>
  );
};

const ProblemSolverCreate: React.FC = () => {
  const [isNavDrawerExpanded, setIsNavDrawerExpanded] = useState(false);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const toggleNavDrawer = () => {
    setIsNavDrawerExpanded(!isNavDrawerExpanded);
  };

  const toggleSideSheet = () => {
    setIsSideSheetOpen(!isSideSheetOpen);
  };

  return (
    <>
      {/* Nav */}
      <Navbar
        isNavDrawerExpanded={isNavDrawerExpanded}
        toggleNavDrawer={toggleNavDrawer}
        toggleSideSheet={toggleSideSheet}
      />
      {/* Content */}

      <div className="flex justify-center">
        <div className="w-full px-3 max-w-2xl ">
          <BlueprintCreateForm />
        </div>
      </div>
    </>
  );
};

export default ProblemSolverCreate;
