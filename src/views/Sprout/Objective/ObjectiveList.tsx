import { useState } from "react";
import { ObjectiveFE } from "./ObjectiveSchema";
import TwoLineListItem from "../../../components/ListItems/TwoLineListItem";
import ObjectiveForm from "./ObjectiveForm";
import useGetObjectives from "./useGetObjectives";
import ButtonBottom from "../../../components/ButtonBottom/ButtonBottom";

const ObjectiveList: React.FC = () => {
  const { objectives, isLoading } = useGetObjectives();
  const [selectedItem, setSelectedItem] = useState<ObjectiveFE | null>(null);

  // const navigate = useNavigate();

  const handleItemClick = (item: ObjectiveFE) => {
    setSelectedItem(item);
  };

  const handleItemExit = () => {
    setSelectedItem(null);
  };

  const handleSave = (updatedItem: ObjectiveFE) => {
    console.log(updatedItem);
    setSelectedItem(null);
  };

  const handleCreate = () => {
    setSelectedItem({
      objective_id: "",
      objective_name: "",
      objective_description: "",
      parameters: [],
    });
  };

  const supportingText = `
  These objectives for AI are like schematics for a building, instructing how it should  should behave. Similar to how schematics define the structure of a building, these configs outline the specific instructions for AI interactions and conversations.
  `;

  if (selectedItem) {
    return (
      <ObjectiveForm
        item={selectedItem}
        onSaveObjective={handleSave}
        onExitObjective={handleItemExit}
      />
    );
  }

  return (
    <>
      {/*  */}
      {/* Header */}
      {/*  */}
      <div className="flex flex-col border-b border-slate-300">
        <p className="py-4 text-xl font-semibold">Objectives</p>
        <p className="text-sm flex flex-col mb-4 font-light text-slate-700">
          {supportingText}
        </p>
      </div>
      {/*  */}
      {/* Content */}
      {/*  */}
      <div className="flex flex-col mt-4 border-b border-slate-300">
        {isLoading && <p>Loading...</p> ? (
          <p>Loading...</p>
        ) : (
          <ul
            className="px-2 flex flex-col border-b border-slate-300"
            data-test-id="objective-list"
          >
            {objectives.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                <TwoLineListItem
                  headline={item.objective_name}
                  supportingText={item.objective_description}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {/*  */}
      {/* Footer */}
      {/*  */}
      <ButtonBottom onClick={handleCreate} variant="primary">
        Create
      </ButtonBottom>
    </>
  );
};

export default ObjectiveList;
