import { useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import IconChevronBack from "../../components/Icons/IconChevronBack";
import { Field, FieldArray, Form, Formik } from "formik";
import FormTextInput from "../../components/FormTextInput/FormTextInput";
import * as Yup from "yup";
import ButtonBottom from "../../components/ButtonBottom/ButtonBottom";

interface Field {
  name: string;
  type: string;
}

const FieldTypes = ["string", "number"];

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

const ObjectiveCreate: React.FC = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
  });

  return (
    <>
      {/* Header */}
      <div className="flex pb-2 items-center">
        <button className="rounded-full hover:bg-gray-200">
          <IconChevronBack />
        </button>
        <p className="text-xl pl-3 font-semibold">New Objective</p>
      </div>

      {/* Main */}
      <div>
        <Accordion headline="Objective Quickstart">
          <p>
            These are your magic spells; these direct the AI to perform a
            specific task whenever you need it. When a objective is defined, the
            AI will structure all of their responses to fit the specified
            format.
          </p>
        </Accordion>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form className="space-y">
              <FormTextInput
                name="username"
                label="Name"
                placeholder="Enter your username"
              />
              <FormTextInput
                name="username"
                label="Description"
                placeholder="Enter your username"
              />
              <Accordion headline="Configuring parameters">
                <p>
                  These are your magic spells; these direct the AI to perform a
                  specific task whenever you need it. When a objective is
                  defined, the AI will structure all of their responses to fit
                  the specified format.
                </p>
              </Accordion>
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

              <div className="absolute bottom-0 left-0 w-full">
                <div className="max-w-2xl mx-auto ">
                  <div className="mx-2">
                    <ButtonBottom variant="primary">Create</ButtonBottom>
                    <ButtonBottom variant="secondary">Back</ButtonBottom>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ObjectiveCreate;
