import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Func, FuncSchema } from "./FuncSchema";
import { Field, FieldArray, useFormik } from "formik";
import { Form } from "react-router-dom";

const FUNCS_URI = "/api/funcs/";

interface FuncInputField {
  name: string;
  type: string;
}

const intial_fields = [
  {
    name: "field1",
    type: "string",
  },
  {
    name: "field2",
    type: "array",
  },
];

const FuncViewComp: React.FC = ({ data }) => {
  console.log(data);
  return (
    <ul>
      {data && data.parameters && <FuncViewComp data={data.parameters} />}
      {data && data.properties && (
        <div>
          <li>hi</li>
          {typeof data.properties}
          {typeof data}
          <FuncViewComp data={data.properties} />
        </div>
      )}

      {/* map over object keys */}
      {!data.properties &&
        !data.parameters &&
        !data.items &&
        Object.keys(data).map((key) => (
          // if typeof data[key] === "string" return <li>string</li>

          <li key={key}>
            <strong>{key}: </strong>
            {typeof data[key] === "object" ? (
              <FuncViewComp data={data[key]} />
            ) : (
              data[key] + "not object "
            )}
          </li>
        ))}
    </ul>
  );
};

const FuncCreateForm: React.FC = () => {
  const [funcs, setFuncs] = useState<Func[]>([]);
  const [func, setFunc] = useState<Func>();
  const [fields, setFields] = useState<FuncInputField[]>(intial_fields);

  const ref = useRef(null);

  const handleGetFuncs = async () => {
    try {
      const response = await fetch(FUNCS_URI, {
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
          const func = res[i];
          new_problem_solvers.push(func);
        }

        setFuncs(new_problem_solvers);
        setFunc(new_problem_solvers[0]);
        console.log("status: handleGetFuncs success");
      } else {
        console.log("status: handleGetFuncs error");
        console.log(response.status);
      }
    } catch (error) {
      console.log("status: handleGetFuncs error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFuncs();
  }, []);

  // const someFuncton = () => {
  //   console.log(ref.current.values);
  // };

  const formik = useFormik({
    // ... Formik setup here
    initialValues: [
      {
        name: "field1",
        type: "string",
      },
      {
        name: "field2",
        type: "array",
      },
    ],
    innerRef: ref,
    onSubmit: () => console.log("hi"),
  });

  function handleChange(name: string, value: string): void {
    throw new Error("Function not implemented.");
  }
  const addField = () => {
    const newField = {
      name: "",
      type: "text",
    };
    setFields([...fields, newField]);
  };

  return (
    <>
      <div className="bg-blue-500">
        <p className="text-md font-bold">Func Create</p>
      </div>
      <div className="bg-green-500">
        {" "}
        <div className="pt-2">
          <input
            className="flex flex-row w-48 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
            id="userInput"
            name="userInput"
            placeholder="Function name"
            // onChange={formik.handleChange}
            // value={formik.values.userInput}
          />
          <input
            className="flex flex-row w-48 text-sm rounded-md m-1 p-2 ring-slate-200 shadow-sm"
            id="userInput"
            name="userInput"
            placeholder="Brief description"
            // onChange={formik.handleChange}
            // value={formik.values.userInput}
          />
        </div>
      </div>
      <div>Properties:</div>
      <div>
        <form onSubmit={formik.handleSubmit}></form>
        <button
          onClick={addField}
          className="bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center"
        >
          <p className="m-2 text-center text-sm">+ Field </p>
        </button>
      </div>
      <div>
        <h2>Nested Object Example:</h2>
        {/* <NestedObjectRenderer nestedObject={func} /> */}
      </div>
      <div className="mt-4 text-xs bg-slate-200 rounded-lg p-2">
        <pre className="overflow-hidden">{JSON.stringify(func, null, 2)}</pre>
        {func && <FuncViewComp data={func} />}
        <pre>{JSON.stringify(formik.values)}</pre>
      </div>
    </>
  );
};

const FuncCreate: React.FC = () => {
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
          <FuncCreateForm />
        </div>
      </div>
    </>
  );
};

export default FuncCreate;
