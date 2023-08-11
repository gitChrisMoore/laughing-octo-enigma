import { useState } from "react";
import { ObjectiveFE } from "./ObjectiveSchema";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import TwoLineListItem from "../../components/ListItems/TwoLineListItem";
import ObjectiveForm from "./ObjectiveForm";
import useGetObjectives from "./useGetObjectives";
import ButtonBottom from "../../components/ButtonBottom/ButtonBottom";

const PROBLEM_SOLVERS_URI = "/api/funcs/";

// TODO:
// - [ ] Make handleSave persist to db
/**
 * ObjectiveList is a React component that renders a list of objectives.
 *
 * It provides functionalities to:
 * - View a list of existing objectives.
 * - Select an objective to view or edit its details using the ObjectiveForm component.
 * - Create a new objective by setting an empty item and utilizing the ObjectiveForm component.
 *
 * State:
 * - objectives: A list of objectives retrieved from the server.
 * - isLoading: A boolean indicating whether the objectives are still loading.
 * - selectedItem: The currently selected objective for viewing or editing.
 *
 * Handlers:
 * - handleItemClick: Handles clicking an item from the list to view or edit.
 * - handleItemExit: Handles exiting the view or edit mode.
 * - handleSave: Handles saving the changes to an existing objective.
 * - handleCreate: Handles creating a new objective.
 *
 * @returns A JSX element that renders the objectives list, or the ObjectiveForm for viewing or editing an objective.
 */

const ObjectiveList: React.FC = () => {
  const { objectives, isLoading } = useGetObjectives(PROBLEM_SOLVERS_URI);
  const [selectedItem, setSelectedItem] = useState<ObjectiveFE | null>(null);

  const navigate = useNavigate();

  const handleItemClick = (item: ObjectiveFE) => {
    // handleToFieldArray(item);
    setSelectedItem(item);
  };

  const handleItemExit = () => {
    setSelectedItem(null);
  };

  const handleSave = (updatedItem: ObjectiveFE) => {
    // Save the changes to the backend
    // E.g., using Axios to make a PUT request to the API
    console.log(updatedItem);
    setSelectedItem(null);
  };

  const handleCreate = () => {
    setSelectedItem({
      id: "",
      name: "",
      description: "",
      parameters: [],
    });
  };

  const headline = "Objectives";
  const supportingText = `
  These for AI are like objectives for a building, instructing how it should  should behave. Similar to how objectives define the structure of a building, these configs outline the specific instructions for AI interactions and conversations.
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
      <div className="flex flex-col">
        <PageHeader headline={headline} supportingText={supportingText} />
        {isLoading && <p>Loading...</p> ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="text-base text-med mt-2 ">Existing Objectives:</p>
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

            <ButtonBottom onClick={handleCreate} variant="primary">
              Create
            </ButtonBottom>
          </div>
        )}
      </div>
    </>
  );
};

export default ObjectiveList;
