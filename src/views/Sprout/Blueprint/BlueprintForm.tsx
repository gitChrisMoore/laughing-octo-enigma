import { Field, Form, Formik } from "formik";
import IconChevronBack from "../../../components/Icons/IconChevronBack";
import { BlueprintView } from "./BlueprintSchema";
import useGetObjectives from "../Objective/useGetObjectives";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import { ChatMessageView } from "./ChatMessageView";
import { IconPlusCircle } from "../../../components/Icons/IconPlusCircle";
import { FooterContentCard } from "../../../components/FooterContentCard/FooterContentCard";
import MainTemplate from "../../MainTemplate";
import { MainContentCard } from "../../../components/MainContentCard/MainContentCard";

type BlueprintFormProps = {
  item: BlueprintView;
  onSave: (vales: BlueprintView) => void;
  onExit: () => void;
};

const BlueprintForm: React.FC<BlueprintFormProps> = ({
  item,
  onSave,
  onExit,
}) => {
  const { objectives } = useGetObjectives();
  const initialObjectives = objectives.reduce((acc, objective) => {
    acc[objective.objective_id] = item.objectives?.some(
      (o) => o.objective_id === objective.objective_id
    )
      ? true
      : false;
    return acc;
  }, {} as { [key: string]: boolean });

  function header() {
    return (
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
    );
  }

  return (
    <>
      <MainTemplate>
        {header()}

        <Formik
          initialValues={{ ...item, objectives: initialObjectives }}
          enableReinitialize
          onSubmit={(values) => {
            const { objectives, ...otherValues } = values;
            const selectedObjectives = Object.keys(objectives).filter(
              (key) => objectives[key]
            );

            const submissionValues = {
              ...otherValues,
              objectives: selectedObjectives.map((objective_id) => ({
                objective_id: objective_id,
              })),
            };

            console.log(submissionValues);
            onSave(submissionValues);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <MainContentCard header="">
                <ChatMessageView
                  label="name"
                  name="blueprint_name"
                  data-test-id="blueprint_name"
                />
                <ChatMessageView
                  label="Description"
                  name="blueprint_description"
                  minRows={5}
                  data-test-id="blueprint_description"
                />
              </MainContentCard>

              <MainContentCard header="Initial Prompt Context">
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
              </MainContentCard>
              {/* Objectives */}
              <MainContentCard header="Objectives">
                <ul
                  className="px-2 flex flex-col border-b border-slate-300 overflow-y-auto max-h-[40vh]"
                  data-test-id="objective_list"
                >
                  {objectives?.map((objective) => (
                    <li
                      key={objective.objective_id}
                      className="container bg-white px-2 py-3"
                      onClick={() => {
                        const currentValue =
                          values.objectives?.[objective.objective_id] ?? false;
                        setFieldValue(
                          `objectives.${objective.objective_id}`,
                          !currentValue
                        );
                      }}
                    >
                      <div className="text-sm flex flex-row font-light text-slate-700">
                        <Field
                          className="mx-4"
                          data-test-id={`objective_${objective.objective_name}`}
                          type="checkbox"
                          name={`objectives.${objective.objective_id}`}
                          onChange={(e: { target: { checked: any } }) => {
                            setFieldValue(
                              `objectives.${objective.objective_id}`,
                              e.target.checked
                            );
                          }}
                        />
                        <div className="flex flex-col py-2 justify-between ">
                          <p className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer">
                            {objective.objective_name.toUpperCase()}
                          </p>

                          {/* <label key={objective.id} className="flex items-center"> */}
                          <div className="text-sm flex flex-col font-light text-slate-700">
                            {objective.objective_description}
                          </div>
                        </div>
                      </div>
                      {/* </label> */}
                    </li>
                  ))}
                </ul>
              </MainContentCard>

              <FooterContentCard>
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
              </FooterContentCard>
            </Form>
          )}
        </Formik>
      </MainTemplate>
    </>
  );
};

export default BlueprintForm;
