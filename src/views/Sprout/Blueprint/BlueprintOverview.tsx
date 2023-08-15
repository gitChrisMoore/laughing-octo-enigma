import MainTemplate from "../../MainTemplate";
import BlueprintList from "./BlueprintList";

const BlueprintOverview: React.FC = () => {
  return (
    <>
      <MainTemplate navTitle="Sprout">
        <BlueprintList />
      </MainTemplate>
    </>
  );
};

export default BlueprintOverview;
