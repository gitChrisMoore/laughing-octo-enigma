import Accordion from "../../../components/Accordion/Accordion";
import IconChevronBack from "../../../components/Icons/IconChevronBack";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import FormTextInput from "../../../components/FormTextInput/FormTextInput";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import { ObjectiveFE } from "./ObjectiveSchema";

type Field = {
  name: string;
  type: string;
  description?: string;
};

type ObjectiveDetailsProps = {
  item: ObjectiveFE;
  onSaveObjective: (vales: ObjectiveFE) => void;
  onExitObjective: () => void;
};

const FieldTypes = ["string", "number", "array"];

const ObjectiveForm: React.FC<ObjectiveDetailsProps> = ({
  item,
  onSaveObjective,
  onExitObjective,
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex pb-2 items-center">
        <button
          type="button"
          onClick={onExitObjective}
          className="rounded-full hover:bg-gray-200"
        >
          <IconChevronBack />
        </button>
        <p className="text-xl pl-3 font-semibold">New Objective</p>
      </div>

      {/* Main */}
      <div className="overflow-auto mx-2 px-2 max-h-[78vh]">
        <Accordion headline="Objective Quickstart">
          <p>
            These are your magic spells; these direct the AI to perform a
            specific task whenever you need it. When a objective is defined, the
            AI will structure all of their responses to fit the specified
            format.
          </p>
        </Accordion>

        <Formik
          initialValues={item}
          onSubmit={(values) => {
            onSaveObjective(values);
          }}
        >
          {({}) => (
            <Form className="space-y">
              <FormTextInput
                name="name"
                label="Name"
                placeholder="Enter your username"
              />
              <FormTextInput
                name="description"
                label="Description"
                placeholder="Enter your username"
              />
              <div>
                <Accordion headline="Configuring parameters">
                  <p>
                    These are your magic spells; these direct the AI to perform
                    a specific task whenever you need it. When a objective is
                    defined, the AI will structure all of their responses to fit
                    the specified format.
                  </p>
                </Accordion>
              </div>
              <FieldArray name="parameters">
                {({ push, form: { values } }: FieldArrayRenderProps) => (
                  <div>
                    {/* {values.parameters.map((field: Field, index: number) => ( */}
                    {values.parameters.map((index: number) => (
                      <div className="flex flex-row" key={index}>
                        <Field
                          className="flex flex-row w-64 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                          // name={`fields.${index}.name`}
                          name={`parameters.${index}.name`}
                          placeholder="Property name"
                        />
                        <Field
                          className="flex flex-row w-32 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                          as="select"
                          name={`parameters.${index}.type`}
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
                    <ButtonBottom type="submit" variant="primary">
                      Save
                    </ButtonBottom>
                    <ButtonBottom
                      type="button"
                      variant="secondary"
                      onClick={onExitObjective}
                    >
                      Back
                    </ButtonBottom>
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

export default ObjectiveForm;
