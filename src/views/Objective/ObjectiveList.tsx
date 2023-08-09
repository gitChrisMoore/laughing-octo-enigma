import { useState } from "react";
import { Objective } from "./ObjectiveSchema";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import TwoLineListItem from "../../components/ListItems/TwoLineListItem";
import ObjectiveDetails from "./ObjectiveDetails";
import useGetObjectives from "./useGetObjectives";
import ButtonBottom from "../../components/ButtonBottom/ButtonBottom";

const PROBLEM_SOLVERS_URI = "/api/funcs/";

// TODO:
// - [ ] Make handleSave persist to db

type Field = {
  name: string;
  type: string;
  description?: string;
};

type formValues = {
  name: string;
  description: string;
  fields: Field[] | undefined;
};

const ObjectiveList: React.FC = () => {
  const { objectives, isLoading } = useGetObjectives(PROBLEM_SOLVERS_URI);
  const [selectedItem, setSelectedItem] = useState<Objective | null>(null);
  const [fieldArray, setFieldArray] = useState<Field[]>();

  const navigate = useNavigate();

  const handleToFieldArray = (item: Objective) => {
    const keysArray = Object.keys(item.parameters.properties);
    const propertiesArray = keysArray.map((key) => ({
      name: key,
      type: item.parameters.properties[key].type,
      description: item.parameters.properties[key].description,
    }));
    setFieldArray(propertiesArray);
  };

  const handleItemClick = (item: Objective) => {
    handleToFieldArray(item);
    setSelectedItem(item);
  };

  const handleItemExit = () => {
    setSelectedItem(null);
  };

  const handleSave = (updatedItem: formValues) => {
    // Save the changes to the backend
    // E.g., using Axios to make a PUT request to the API
    console.log(updatedItem);
    setSelectedItem(null);
  };

  const headline = "Objectives";
  const supportingText = `
  These for AI are like objectives for a building, instructing how it should  should behave. Similar to how objectives define the structure of a building, these configs outline the specific instructions for AI interactions and conversations.
  `;

  if (selectedItem) {
    return (
      <ObjectiveDetails
        item={selectedItem}
        fields={fieldArray}
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

            <ButtonBottom
              onClick={() => navigate("/problem-solver-overview/create")}
              variant="primary"
            >
              Create
            </ButtonBottom>
          </div>
        )}
      </div>
    </>
  );
};

export default ObjectiveList;
