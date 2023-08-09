import { useEffect, useState } from "react";
import { Objective, ObjectiveSchema } from "./ObjectiveSchema";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import TwoLineListItem from "../../components/ListItems/TwoLineListItem";
import ObjectiveDetails from "./ObjectiveDetails";

const PROBLEM_SOLVERS_URI = "/api/funcs/";

const ObjectiveList: React.FC = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [selectedItem, setSelectedItem] = useState<Objective | null>(null);

  const navigate = useNavigate();

  const handleItemClick = (item: Objective) => {
    setSelectedItem(item);
  };
  const handleItemExit = () => {
    setSelectedItem(null);
  };

  const handleSave = (updatedItem: Objective) => {
    // Save the changes to the backend
    // E.g., using Axios to make a PUT request to the API
    console.log(updatedItem);
  };

  const handleGetObjectives = async () => {
    try {
      const response = await fetch(PROBLEM_SOLVERS_URI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        const new_problem_solvers = [];
        const res = await response.json();
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          const objective = ObjectiveSchema.parse(res[i]);
          new_problem_solvers.push(objective);
        }

        setObjectives(new_problem_solvers);
        console.log("status: handleGetObjectives success");
      } else {
        console.log("status: handleGetObjectives error asdasd");
        console.log(response.status);
      }
    } catch (error) {
      console.log("status: handleGetObjectives error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetObjectives();
  }, []);

  const headline = "Blueprints";
  const supportingText = `
  These for AI are like blueprints for a building, instructing how it should  should behave. Similar to how blueprints define the structure of a building, these configs outline the specific instructions for AI interactions and conversations.
  `;

  if (selectedItem) {
    return (
      <ObjectiveDetails
        item={selectedItem}
        onSaveObjective={handleSave}
        onExitObjective={handleItemExit}
      />
    );
  }

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}

      <div className="flex flex-col">
        <PageHeader headline={headline} supportingText={supportingText} />
        <p className="text-base text-med mt-2 ">Existing Blueprints:</p>
        {objectives.map((item, index) => (
          <div
            key={index}
            className="py-2"
            onClick={() => handleItemClick(item)}
          >
            <TwoLineListItem
              headline={item.name}
              supportingText={item.description}
            />
          </div>
        ))}

        <button
          onClick={() => navigate("/problem-solver-overview/create")}
          className="bg-primary w-full text-white rounded-full justify-center items-center"
        >
          <p className="m-2 text-center text-sm">Add Blueprint </p>
        </button>
      </div>
    </>
  );
};

export default ObjectiveList;
