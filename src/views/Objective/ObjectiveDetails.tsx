import Accordion from "../../components/Accordion/Accordion";
import IconChevronBack from "../../components/Icons/IconChevronBack";
import { Field, FieldArray, Form, Formik } from "formik";
import FormTextInput from "../../components/FormTextInput/FormTextInput";
import ButtonBottom from "../../components/ButtonBottom/ButtonBottom";
import { Objective } from "./ObjectiveSchema";

const test_data = [
  {
    id: "31db3025-00c3-4258-a717-718e9a11388b",
    name: "build_persona",
    description:
      "Generates a persona, defining key demographics, behaviors, and goals to guide product development.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "frieldy name of the persona",
        },
        age: {
          type: "number",
          description: "age of the persona",
        },
        occupation: {
          type: "string",
          description: "occupation of the persona",
        },
        education: {
          type: "string",
          description: "education of the persona",
        },
        personality_traits: {
          type: "array",
          items: {
            type: "string",
            description: "personality traits of the persona",
          },
        },
        interests: {
          type: "array",
          items: {
            type: "string",
            description: "interests traits of the persona",
          },
        },
        pain_points: {
          type: "array",
          items: {
            type: "string",
            description: "pain_points traits of the persona",
          },
        },
        goals: {
          type: "array",
          items: {
            type: "string",
            description: "goals traits of the persona",
          },
        },
      },
      required: [
        "name",
        "age",
        "occupation",
        "personality_traits",
        "education",
        "interests",
        "pain_points",
        "goals",
      ],
    },
  },
  {
    id: "94264995-61ee-4f67-ad6d-be8a4be667c3",
    name: "define_market_focus",
    description:
      "Generates target market by considering factors like geographic location, age, income level, and consumer interests.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "frieldy name of the persona",
        },
        description: {
          type: "number",
          description: "age of the persona",
        },
      },
      required: ["name", "description"],
    },
  },
  {
    id: "dd861d6a-182b-4f40-bb6d-a5b004c8692f",
    name: "segment_addressable_market",
    description:
      "Divides the overall market into segments based on demographics, behaviors, and needs to pinpoint the target audience.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "frieldy name of the persona",
        },
        description: {
          type: "number",
          description: "age of the persona",
        },
      },
      required: ["name", "description"],
    },
  },
  {
    id: "e778354f-5a68-4ed3-96d7-c4daa2a137b4",
    name: "build_audience_profile",
    description:
      "onstructs a detailed profile of the target audience, focusing on specific characteristics that align with a product or service.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "frieldy name of the persona",
        },
        description: {
          type: "number",
          description: "age of the persona",
        },
      },
      required: ["name", "description"],
    },
  },
  {
    id: "e3fe9f8b-56f5-4b0f-add9-defdc19cbb42",
    name: "analyze_market_trends",
    description:
      "Evaluates current market trends and consumer behavior to define the most relevant target market for a campaign or product launch.",
    parameters: {
      type: "object",
      properties: {
        trends: {
          type: "array",
          description: "Array of market trends",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "frieldy name of the market trend",
              },
              implication: {
                type: "string",
                description:
                  "Inference of what the market trend means to the industry",
              },
            },
          },
        },
      },
    },
  },
];

// TODO:
// - [ ] Add additional types to type field
// - [ ] Add overview to the scroll
// - [ ] Add validation to the form
// - [ ] Allow description to be multi-line
// - [ ]

interface Field {
  name: string;
  type: string;
}

type ObjectiveDetailsProps = {
  item: Objective;
  onSaveObjective: (objective: Objective) => void;
  onExitObjective: () => void;
};

const FieldTypes = ["string", "number"];

const ObjectiveDetails: React.FC<ObjectiveDetailsProps> = ({
  item,
  onSaveObjective,
  onExitObjective,
}) => {
  console.log(item);
  console.log(Object.keys(item.parameters.properties));
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
          initialValues={item}
          onSubmit={(values) => {
            onSaveObjective(values);
          }}
        >
          {({ values }) => (
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
              <Accordion headline="Configuring parameters">
                <p>
                  These are your magic spells; these direct the AI to perform a
                  specific task whenever you need it. When a objective is
                  defined, the AI will structure all of their responses to fit
                  the specified format.
                </p>
              </Accordion>
              <FieldArray name="parameters.properties">
                {({ push }: { push: (field: Field) => void }) => (
                  <div>
                    {Object.keys(values.parameters.properties).map(
                      (field, index) => (
                        <div className="flex flex-row" key={index}>
                          <Field
                            className="flex flex-row w-64 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
                            name={field}
                            value={field}
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

export default ObjectiveDetails;
