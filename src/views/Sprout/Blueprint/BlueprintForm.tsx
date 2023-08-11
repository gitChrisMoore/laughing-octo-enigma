import {
  Field,
  FieldArray,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";
import IconChevronBack from "../../../components/Icons/IconChevronBack";
import { Blueprint } from "./BlueprintSchema";
import TwoLineListItemButtons from "../../../components/ListItems/TwoLineListItemButtons";
import { useState } from "react";

type FormSectionHeaderProps = {
  children: React.ReactNode;
};

const FormSectionHeader: React.FC<FormSectionHeaderProps> = ({ children }) => (
  <div className="flex mb-4 border-b text-primary border-primary">
    <p className="text-lg font-bold">{children}</p>
  </div>
);

type InputTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

const InputTextArea: React.FC<InputTextAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label htmlFor={props.name} className="mt-4 block text-sm ">
        {label.toUpperCase()}
      </label>
      <textarea
        id={props.name}
        className={`mt-1 p-2 w-full border text-base rounded-md ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
        rows={5}
        {...field}
        {...props}
      />
    </>
  );
};

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};
const InputText: React.FC<InputTextProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <label htmlFor={props.name} className="mt-4 block text-sm ">
        {label.toUpperCase()}
      </label>
      <input
        id={props.name}
        className={` p-2 w-full border text-sm rounded-md ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
        {...field}
        {...props}
      />
    </>
  );
};

const InitialContextSection = ({ onSelectedMessage }) => {
  const { values, setFieldValue } = useFormikContext<Blueprint>();

  return (
    <div>
      <FormSectionHeader>Initial a Context</FormSectionHeader>
      asdasd
      <div className="space-between-y-2">
        {values.initial_context.map((_, index) => (
          <div className="mb-2">
            <TwoLineListItemButtons
              key={index}
              headline={values.initial_context[index].role}
              supportingText={values.initial_context[index].content}
              handleItemClick={() => {
                onSelectedMessage(index);
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="align-top bg-primary text-primary_on p-2 rounded-lg mt-2 text-sm"
        onClick={() => console.log("click")}
      >
        Add New Message
      </button>
    </div>
  );
};

const FunctionsSection = () => {
  const { values, setFieldValue } = useFormikContext<Blueprint>();

  return (
    <FieldArray name="functions">
      {({ push, remove }) => (
        <div>
          {values.functions.map((_, index) => (
            <div key={index}>
              <input
                name={`functions.${index}.name`}
                type="text"
                onChange={(e) =>
                  setFieldValue(`functions.${index}.name`, e.target.value)
                }
              />
              <input
                name={`functions.${index}.description`}
                type="text"
                onChange={(e) =>
                  setFieldValue(
                    `functions.${index}.description`,
                    e.target.value
                  )
                }
              />
              {/* Add Fields for parameters as required */}
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => push({ name: "", description: "" })}
          >
            Add Function
          </button>
        </div>
      )}
    </FieldArray>
  );
};

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
  const [isInitialContextFocus, setIsInitialContextFocus] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<number>(0);

  const handleEditMessage = (index: number) => {
    setIsEditingMessage(true);
  };

  if (isEditingMessage) {
    return <div>asdasd</div>;
  }

  if (isInitialContextFocus) {
    return (
      <div>
        <button onClick={() => setIsInitialContextFocus(false)}>
          Exit Initial Context
        </button>
        {/* <InitialContextSection /> */}
      </div>
    );
  }

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
        <p className="text-xl pl-3 font-semibold">Blueprint</p>
      </div>

      {/* Main */}
      <div className="overflow-auto mx-2 px-2 max-h-[78vh]">
        <Formik
          initialValues={item}
          onSubmit={(values) => {
            // handle submission
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form>
              {/*  */}
              {/*  */}
              {/* Simple Header */}
              {/*  */}
              <FormSectionHeader>Properties</FormSectionHeader>
              <div>
                <InputText name="name" label="Name" />
                <InputTextArea name="description" label="Objective" />
              </div>
              {/*  */}
              {/*  */}
              {/* Initial Context Form */}
              {/*  */}
              <div className="mt-6">
                <FormSectionHeader>Initial Context</FormSectionHeader>
                <div className="space-between-y-2">
                  <InputTextArea
                    name="description"
                    label="SYSTEM INSTRUCTION(S)"
                  />
                  {values.initial_context.map((_, index) => (
                    <div className="mb-2" key={index}>
                      <TwoLineListItemButtons
                        key={index}
                        headline={values.initial_context[index].role}
                        supportingText={values.initial_context[index].content}
                        handleItemClick={() => {
                          handleEditMessage(index);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="align-top bg-primary text-primary_on p-2 rounded-lg mt-2 text-sm"
                  onClick={() => console.log("click")}
                >
                  Add New Message
                </button>
              </div>
              // <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default BlueprintForm;
