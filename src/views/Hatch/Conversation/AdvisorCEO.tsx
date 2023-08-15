import RailsConversation from "../ConvoFramework/RailsConversation";
import RailsFunctional from "../ConvoFramework/RailsFunctional";
import MainTemplate from "../../MainTemplate";

const AdvisorCEO: React.FC = () => {
  return (
    <>
      <MainTemplate
        navTitle="Hatch"
        sideSheetTitle="AI Modeled"
        sideSheetContent={<RailsFunctional />}
      >
        <RailsConversation />
      </MainTemplate>
    </>
  );
};

export default AdvisorCEO;
