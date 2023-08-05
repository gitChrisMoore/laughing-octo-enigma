import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const reference_func_data = [
  {
    id: 1,
    name: "persona_ai",
    description: "persona_ai model blah blah",
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
    id: 2,
    name: "trend_api",
    description: "persona_ai model blah blah",
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

These two objects have a common type.  Write a typescript type that represents this common type:

const obj1 = {
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

    personality_traits: {
      type: "array",
      items: {
        type: "string",
        description: "personality traits of the persona",
      },
    },
  },
  required: ["name", "age", "occupation", "personality_traits"],
};

const obj2 = {
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
};

const FuncCreateForm: React.FC = () => {
  return (
    <>
      <div className="bg-blue-500">
        <p className="text-md font-bold">Func Create</p>
      </div>
      <div className="bg-green-500">
        {" "}
        <div className="pt-4">
          <input
            className="w-48 text-sm rounded-md m-1 p-2 ring-1  ring-slate-200 shadow-sm"
            id="userInput"
            name="userInput"
            placeholder="Function name"
            // onChange={formik.handleChange}
            // value={formik.values.userInput}
          />
          <input
            className="w-48 text-sm rounded-md m-1 p-2 ring-slate-200 shadow-sm"
            id="userInput"
            name="userInput"
            placeholder="Brief description"
            // onChange={formik.handleChange}
            // value={formik.values.userInput}
          />
        </div>
      </div>
    </>
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
