import { Field, FieldArray, Form, Formik } from "formik";
import IconChevronBack from "../../../components/Icons/IconChevronBack";
import { BlueprintView } from "./BlueprintSchema";
import useGetObjectives from "../../Objective/useGetObjectives";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import { ChatMessageView } from "./ChatMessageView";
import { IconPlusCircle } from "../../../components/Icons/IconPlusCircle";

const PROBLEM_SOLVERS_URI = "/api/funcs/";

type BlueprintFormProps = {
  item: BlueprintView;
  onSave: (vales: BlueprintView) => void;
  onExit: () => void;
};

const BlueprintFormNew: React.FC<BlueprintFormProps> = ({
  item,
  onSave,
  onExit,
}) => {
  const { objectives, isLoading } = useGetObjectives(PROBLEM_SOLVERS_URI);
  const initialObjectives = objectives.reduce((acc, objective) => {
    acc[objective.id] = item.objective_ids?.includes(objective.id) || false;
    return acc;
  }, {} as { [key: string]: boolean });

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
      <div className="overflow-auto max-h-[78vh]">
        <Formik
          initialValues={{ ...item, objectives: initialObjectives }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {/*  */}
              {/*  */}
              {/* Simple Header */}
              {/*  */}
              <div className="flex flex-col border-b border-slate-300">
                <p className="py-4 text-lg font-semibold">Properties</p>
                <ChatMessageView label="name" name="name" />
                <ChatMessageView
                  label="Description"
                  name="description"
                  minRows={5}
                />
              </div>
              {/*  */}
              {/*  */}
              {/* Initial Context Form */}
              {/*  */}
              <div className="flex flex-col border-b border-slate-300">
                <p className="py-4 text-lg font-semibold">
                  Initial Prompt Context
                </p>
                {values.init_system_chat_messages.map((_, index) => (
                  <div key={index}>
                    <ChatMessageView
                      // label={values.init_example_chat_messages[index].role}
                      label={values.init_system_chat_messages[index].role}
                      name={`init_system_chat_messages.${index}.content`}
                    />
                  </div>
                ))}
                <p className="py-4 text-sm"> Examples of context for prompt:</p>
                {values.init_example_chat_messages.map((_, index) => (
                  <div key={index}>
                    <ChatMessageView
                      // label={values.init_example_chat_messages[index].role}
                      label={values.init_example_chat_messages[index].role}
                      name={`init_example_chat_messages.${index}.content`}
                      showCloseButton
                      onDelete={() => {
                        // Delete the context at the current index
                        setFieldValue(
                          "init_example_chat_messages",
                          values.init_example_chat_messages.filter(
                            (_, idx) => idx !== index
                          )
                        );
                      }}
                      onRoleClick={() => {
                        // Toggle the role for the specific context
                        setFieldValue(
                          `init_example_chat_messages.${index}.role`,
                          values.init_example_chat_messages[index].role ===
                            "User"
                            ? "Assistant"
                            : "User"
                        );
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newContext = {
                      role: "User", // You can modify these values as needed
                      content: "",
                    };
                    setFieldValue("init_example_chat_messages", [
                      ...values.init_example_chat_messages,
                      newContext,
                    ]);
                  }}
                >
                  <div className="py-4 flex flex-row items-center text-xs font-semibold">
                    <div className="px-2 flex flex-col">
                      <IconPlusCircle />
                    </div>
                    <div className="flex flex-col">Add New Context</div>
                  </div>
                </button>

                {/* Objectives */}
                <div className="flex flex-col border-b border-slate-300">
                  <p className="py-4 text-lg font-semibold">Objectives</p>
                  <div className="px-2 flex flex-col border-b border-slate-300 overflow-y-auto max-h-[40vh]">
                    {objectives?.map((objective) => (
                      <div
                        key={objective.id}
                        className="container bg-white px-2 py-3"
                        onClick={() => {
                          const currentValue =
                            values.objectives?.[objective.id] ?? false;
                          setFieldValue(
                            `objectives.${objective.id}`,
                            !currentValue
                          );
                        }}
                      >
                        <div className="text-sm flex flex-row font-light text-slate-700">
                          <Field
                            className="mx-4"
                            type="checkbox"
                            name={`objectives.${objective.id}`}
                            onChange={(e: { target: { checked: any } }) => {
                              setFieldValue(
                                `objectives.${objective.id}`,
                                e.target.checked
                              );
                            }}
                          />

                          <div className="flex flex-col py-2 justify-between ">
                            <p className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer">
                              {objective.name.toUpperCase()}
                            </p>

                            {/* <label key={objective.id} className="flex items-center"> */}
                            <div className="text-sm flex flex-col font-light text-slate-700">
                              {objective.description}
                            </div>
                          </div>
                        </div>
                        {/* </label> */}
                      </div>
                    ))}
                  </div>
                </div>
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
                      onClick={() => {
                        console.log("clicked");
                        onExit();
                      }}
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

export default BlueprintFormNew;
