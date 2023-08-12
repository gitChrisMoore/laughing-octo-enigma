import { useState } from "react";
import SideSheet from "../../../components/SideSheet/SideSheet";
import Navbar from "../../../components/Navbar/Navbar";
import RailsConversation from "../ConvoFramework/RailsConversation";
import RailsFunctional from "../ConvoFramework/RailsFunctional";

const AdvisorCEO: React.FC = () => {
  const [isNavDrawerExpanded, setIsNavDrawerExpanded] = useState(false);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const toggleNavDrawer = () => {
    setIsNavDrawerExpanded(!isNavDrawerExpanded);
  };

  const toggleSideSheet = () => {
    setIsSideSheetOpen(!isSideSheetOpen);
  };

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}
      <Navbar
        isNavDrawerExpanded={isNavDrawerExpanded}
        toggleNavDrawer={toggleNavDrawer}
        toggleSideSheet={toggleSideSheet}
        title="Hatch"
      />
      <div className="h-[calc(100vh-56px)] flex justify-center">
        <div className="w-full px-3 max-w-2xl ">
          <RailsConversation />
        </div>
      </div>
      <div>
        <SideSheet
          isExpanded={isSideSheetOpen}
          toggleIsExpanded={toggleSideSheet}
          title={"AI Modeled"}
        >
          <RailsFunctional />
        </SideSheet>
      </div>
    </>
  );
};

export default AdvisorCEO;
