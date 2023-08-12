import { useState } from "react";
import { BlueprintView } from "./BlueprintSchema";
import PageHeader from "../../../components/PageHeader/PageHeader";
import TwoLineListItem from "../../../components/ListItems/TwoLineListItem";
import useBlueprints from "./useBlueprints";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import BlueprintFormNew from "./BlueprintForm";

const BlueprintList: React.FC = () => {
  const { blueprints, isLoading, getBlueprint, updateBlueprint } =
    useBlueprints();
  const [selectedItem, setSelectedItem] = useState<BlueprintView | null>(null);

  const handleItemClick = async (item: BlueprintView) => {
    const res = await getBlueprint(item.blueprint_id);
    if (res) {
      setSelectedItem(res);
    } else {
      console.log("Error getting blueprint");
    }
  };

  const handleItemExit = () => {
    setSelectedItem(null);
  };

  const handleSave = async (updatedItem: BlueprintView) => {
    // Save the changes to the backend
    console.log(updatedItem);
    const res = await updateBlueprint(updatedItem);
    if (res) {
      setSelectedItem(null);
    } else {
      console.log("Error Saving Blueprint");
    }
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
                  headline={item.blueprint_name}
                  supportingText={item.blueprint_description}
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
