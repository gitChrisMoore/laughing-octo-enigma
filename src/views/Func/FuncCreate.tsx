import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { Field, FieldArray, Form, Formik } from "formik";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const FUNCS_URI = "/api/funcs/";

interface Field {
  name: string;
  type: string;
}

const initialValues = {
  name: "",
  description: "",
  fields: [
    {
      name: "",
      type: "",
    },
  ] as Field[],
};

const FieldTypes = ["string", "number"];

const FuncCreateForm = () => {
  const navigate = useNavigate();
  const parseFormValues = (values: any) => {
    const parsedValues = {
      id: uuid(),
      name: values.name,
      description: values.description,
      parameters: {
        type: "object",
        properties: values.fields.reduce(
          (
            acc: { [x: string]: { type: any; description: string } },
            field: { name: string | number; type: any }
          ) => {
            acc[field.name] = {
              type: field.type,
              description: `friendly name of the ${field.name}`,
            };
            return acc;
          },
          {}
        ),
      },
      required: values.fields.map((field: { name: any }) => field.name),
    };
    console.log(parsedValues);
    return parsedValues;
  };

  const handleSubmit = async (values: any) => {
    const formInput = parseFormValues(values);
    try {
      const response = await fetch(FUNCS_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
      });
      const data = await response.json();
      console.log(data);
      navigate("/func-overview");
      // setProblemSolvers([...problemSolvers, data]);
      // navigate("/problem-solver-overview");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-4 mb-2">
        <p>Create Function</p>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <Field
              className="flex flex-row w-48 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
              name="name"
              placeholder="Name"
            />
            <Field
              className="flex flex-row w-48 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
              name="description"
              placeholder="Description"
            />
            <div className="mt-4 mb-2">
              <p>Function parameters</p>
            </div>
            <FieldArray name="fields">
              {({ push }: { push: (field: Field) => void }) => (
                <div>
                  {values.fields.map((field, index) => (
                    <div className="flex flex-row" key={index}>
                      <Field
                        className="flex flex-row w-64 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                        name={`fields[${index}].name`}
                        placeholder="Enter a property name.."
                      />
                      <Field
                        className="flex flex-row w-32 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                        as="select"
                        name={`fields[${index}].type`}
                      >
                        <option value="">Select Type</option>
                        {FieldTypes.map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </Field>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => push({ name: "", type: "" })}
                    className="bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center"
                  >
                    <p className="m-2 text-center text-sm">+ Field </p>
                  </button>
                </div>
              )}
            </FieldArray>

            <button className="w-full bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center">
              <p className="m-2 text-center text-sm">Submit </p>
            </button>
          </Form>
        )}
      </Formik>
    </div>
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
