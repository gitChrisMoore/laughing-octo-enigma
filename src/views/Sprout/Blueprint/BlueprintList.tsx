import { useState } from "react";
import { BlueprintView } from "./BlueprintSchema";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader/PageHeader";
import TwoLineListItem from "../../../components/ListItems/TwoLineListItem";
import useBlueprints from "./useBlueprints";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import BlueprintFormNew from "./BlueprintFormNew";

const PROBLEM_SOLVERS_URI = "/api/crud_problem_solvers/";

const BlueprintList: React.FC = () => {
  const { blueprints, isLoading } = useBlueprints(PROBLEM_SOLVERS_URI);
  const [selectedItem, setSelectedItem] = useState<BlueprintView | null>(null);

  const navigate = useNavigate();

  const handleItemClick = (item: BlueprintView) => {
    // handleToFieldArray(item);
    setSelectedItem(item);
  };

  const handleItemExit = () => {
    setSelectedItem(null);
  };

  const handleSave = (updatedItem: BlueprintView) => {
    // Save the changes to the backend
    // E.g., using Axios to make a PUT request to the API
    console.log(updatedItem);
    setSelectedItem(null);
  };

  const handleCreate = () => {
    // setSelectedItem({
    //   // id: "",
    //   name: "",
    //   description: "",
    //   // parameters: [],
    // });
  };

  const headline = "Blueprints";
  const supportingText = `
  These for AI are like blueprints for a building, instructing how it should  should behave. Similar to how blueprints define the structure of a building, these configs outline the specific instructions for AI interactions and conversations.
  `;

  if (selectedItem) {
    console.log(selectedItem);
    return (
      <BlueprintFormNew
        item={selectedItem}
        onSave={handleSave}
        onExit={handleItemExit}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <PageHeader headline={headline} supportingText={supportingText} />
        {isLoading && <p>Loading...</p> ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="text-base text-med mt-2 ">Existing Blueprints:</p>
            {blueprints.map((item, index) => (
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

            <ButtonBottom onClick={handleCreate} variant="primary">
              Create
            </ButtonBottom>
          </div>
        )}
      </div>
    </>
  );
};

export default BlueprintList;
