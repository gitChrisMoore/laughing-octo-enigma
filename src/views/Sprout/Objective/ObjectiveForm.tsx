import IconChevronBack from "../../../components/Icons/IconChevronBack";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import { ObjectiveFE } from "./ObjectiveSchema";
import { ChatMessageView } from "../Blueprint/ChatMessageView";

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
  function header() {
    return (
      <div className="flex pb-2 items-center">
        <button
          type="button"
          onClick={onExitObjective}
          className="rounded-full hover:bg-gray-200"
        >
          <IconChevronBack />
        </button>
        <p className="text-xl pl-3 font-semibold">Objective Detail</p>
      </div>
    );
  }
  return (
    <>
      {header()}

      {/* Main */}
      <div className="overflow-auto max-h-[78vh]">
        <Formik
          initialValues={item}
          onSubmit={(values) => {
            onSaveObjective(values);
          }}
        >
          {({}) => (
            <Form className="space-y">
              <div className="flex flex-col border-b border-slate-300">
                <p className="py-4 text-lg font-semibold">General</p>
                <ChatMessageView
                  label="Name"
                  name="objective_name"
                  data-test-id="objective_name"
                />
                <ChatMessageView
                  label="Description"
                  name="objective_description"
                  data-test-id="objective_description"
                  minRows={5}
                />
              </div>

              <div className="flex flex-col border-b border-slate-300">
                <p className="py-4 text-lg font-semibold">
                  Function Parameters
                </p>
                <FieldArray name="parameters">
                  {({ push, form: { values } }: FieldArrayRenderProps) => (
                    <div>
                      {/* {values.parameters.map((field: Field, index: number) => ( */}
                      {values.parameters.map((index: number) => (
                        <div className="flex flex-row" key={index}>
                          <Field
                            className="flex flex-row w-64 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                            name={`parameters.${index}.name`}
                            placeholder="Property name"
                            data-test-id={`parameters.${index}.name`}
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
              </div>
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
