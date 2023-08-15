import MainTemplate from "../../MainTemplate";
import ObjectiveList from "./ObjectiveList";

const ObjectiveOverview: React.FC = () => {
  return (
    <>
      <MainTemplate navTitle={"Sprout"}>
        <ObjectiveList />
      </MainTemplate>
    </>
  );
};

export default ObjectiveOverview;
