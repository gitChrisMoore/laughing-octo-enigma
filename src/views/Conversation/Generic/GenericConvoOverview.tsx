import { useState } from "react";
import GenericConvoSSE from "./GenericConvoSSE";
import GenericConvoTrendWidget from "./GenericConvoTrendWidget";
import SideSheet from "../../../components/SideSheet/SideSheet";
import Navbar from "../../../components/Navbar/Navbar";

const GenericConvoOverview: React.FC = () => {
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
      />
      <div className="flex justify-center">
        <div className="w-full px-3 max-w-2xl ">
          <GenericConvoSSE />
        </div>
      </div>
      <div>
        <SideSheet
          isExpanded={isSideSheetOpen}
          toggleIsExpanded={toggleSideSheet}
          title={"AI Modeled"}
        >
          <GenericConvoTrendWidget />
        </SideSheet>
      </div>
    </>
  );
};

export default GenericConvoOverview;
