import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import { Blueprint } from "./BlueprintSchema";
import IconChevronBack from "../../../components/Icons/IconChevronBack";
import Accordion from "../../../components/Accordion/Accordion";
import FormTextInput from "../../../components/FormTextInput/FormTextInput";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import TwoLineListItemButtons from "../../../components/ListItems/TwoLineListItemButtons";

// TODO:
// - [ ]

type Field = {
  name: string;
  type: string;
  description?: string;
};

type BlueprintFormProps = {
  item: Blueprint;
  onSave: (vales: Blueprint) => void;
  onExit: () => void;
};

const FieldTypes = ["system", "assistant", "user"];

const BlueprintForm: React.FC<BlueprintFormProps> = ({
  item,
  onSave,
  onExit,
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex pb-2 items-center">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full hover:bg-gray-200"
        >
          <IconChevronBack />
        </button>
        <p className="text-xl pl-3 font-semibold">New Blueprint</p>
      </div>

      {/* Main */}
      <div className="overflow-auto mx-2 px-2 max-h-[78vh]">
        <Formik
          initialValues={item}
          onSubmit={(values) => {
            onSave(values);
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
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-600"
                >
                  Content
                </label>
                <textarea
                  // id="description"
                  // name="description"
                  // name={`values.description`}
                  name={form.values.description}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={description}
                  rows={15}
                  className="mt-1 p-2 w-full text-xs border rounded-md"
                />
                {/* {formik.touched.content && formik.errors.content ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.content}
                  </div>
                ) : null} */}
              </div>

              <FieldArray name="initial_context">
                {({ push, form: { values } }: FieldArrayRenderProps) => (
                  <div>
                    {values.initial_context.map(
                      (field: Field, index: number) => (
                        <div className="flex flex-row" key={index}>
                          <li className="mt-2" key={index}>
                            <TwoLineListItemButtons
                              headline={`initial_context.${index}.role`}
                              supportingText={`initial_context.${index}.content`}
                              // handleItemClick={() => handleEdit(index)}
                              // activeIndexItem={selectedMessageIndex}
                              itemIndex={index}
                              // handleDeleteClick={() => handleDelete(index)}
                            />
                          </li>
                          <Field
                            className="flex flex-row w-64 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                            // name={`fields.${index}.name`}
                            name={`initial_context.${index}.content`}
                            placeholder="Property content"
                          />
                          <Field
                            className="flex flex-row w-32 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                            as="select"
                            name={`initial_context.${index}.role`}
                          >
                            <option value="">Select Type</option>
                            {FieldTypes.map((type, i) => (
                              <option key={i} value={type}>
                                {type}
                              </option>
                            ))}
                          </Field>
                        </div>
                      )
                    )}

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
                      onClick={onExit}
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

export default BlueprintForm;
