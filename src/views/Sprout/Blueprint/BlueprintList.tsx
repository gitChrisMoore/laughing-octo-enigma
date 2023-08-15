import { useEffect, useState } from "react";
import { BlueprintView } from "./BlueprintSchema";
import TwoLineListItem from "../../../components/ListItems/TwoLineListItem";
import useBlueprints from "./useBlueprints";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";
import BlueprintFormNew from "./BlueprintForm";
import MainTemplate from "../../MainTemplate";
import { MainContentCard } from "../../../components/MainContentCard/MainContentCard";
import { FooterContentCard } from "../../../components/FooterContentCard/FooterContentCard";

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

  useEffect(() => {}, [blueprints]);

  const handleCreate = () => {
    // setSelectedItem({
    //   // id: "",
    //   name: "",
    //   description: "",
    //   // parameters: [],
    // });
  };

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
      <MainTemplate>
        <main className="flex-grow pb-16 overflow-y-auto">
          <MainContentCard header="Blueprints">
            These for AI are like blueprints for a building, instructing how it
            should should behave. Similar to how blueprints define the structure
            of a building, these configs outline the specific instructions for
            AI interactions and conversations.
          </MainContentCard>
          <div className="  flex flex-col mt-4 border-b border-slate-300">
            {isLoading ? (
              <p>Loading... </p>
            ) : (
              <ul
                className="px-2 flex flex-col bg-white "
                data-test-id="blueprint-list"
              >
                {blueprints.map((item, index) => (
                  <li
                    key={index}
                    data-test-id={`blueprint_${item.blueprint_name}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {/* {`blueprint_${item.blueprint_name}`} */}
                    <TwoLineListItem
                      headline={item.blueprint_name}
                      supportingText={item.blueprint_description}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
        <FooterContentCard>
          <ButtonBottom onClick={handleCreate} variant="primary">
            Create
          </ButtonBottom>
        </FooterContentCard>
      </MainTemplate>
    </>
  );
};

export default BlueprintList;
