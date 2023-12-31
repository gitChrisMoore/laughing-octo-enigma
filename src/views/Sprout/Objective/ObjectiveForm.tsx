import IconChevronBack from "../../../components/Icons/IconChevronBack";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import { ObjectiveFE } from "./ObjectiveSchema";
import { ChatMessageView } from "../Blueprint/ChatMessageView";
import { MainContentCard } from "../../../components/MainContentCard/MainContentCard";
import { FooterContentCard } from "../../../components/FooterContentCard/FooterContentCard";

type Field = {
  name: string;
  type: string;
  description?: string;
};

export type FooterContentCardProps = {
  children?: React.ReactNode;
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
      <main className="flex-grow pb-16 overflow-y-auto">
        {header()}

        {/* Main */}

        <Formik
          initialValues={item}
          onSubmit={(values) => {
            onSaveObjective(values);
          }}
        >
          {({}) => (
            <Form>
              <MainContentCard header="General">
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
              </MainContentCard>

              <MainContentCard header="Functional Parameters">
                <FieldArray name="parameters">
                  {({ push, form: { values } }: FieldArrayRenderProps) => (
                    <ul className="container">
                      {values.parameters.map((item: any, index: number) => (
                        <li className="container flex" key={item.name}>
                          <Field
                            className="flex flex-col w-full  text-sm rounded-md my-1 p-2 ring-1  ring-slate-200 shadow-sm"
                            name={`parameters.${index}.name`}
                            placeholder="Property name"
                            data-test-id={`parameters.${index}.name`}
                          />
                          <Field
                            className="flex flex-col text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
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
                        </li>
                      ))}

                      <button
                        type="button"
                        onClick={() => push({ name: "", type: "" })}
                        className="bg-slate-500 mt-2 text-white rounded-lg justify-center items-center"
                      >
                        <p className="m-2 text-center text-sm">+ Field </p>
                      </button>
                    </ul>
                  )}
                </FieldArray>
              </MainContentCard>

              <FooterContentCard>
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
              </FooterContentCard>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
};

export default ObjectiveForm;
