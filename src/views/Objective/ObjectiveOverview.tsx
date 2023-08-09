import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ObjectiveCreate from "./ObjectiveCreate";
import ObjectiveList from "./ObjectiveList";

const ObjectiveOverview: React.FC = () => {
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
        title="Sprout"
      />
      <div className="container px-2 max-w-2xl mx-auto">
        <ObjectiveList />
      </div>
    </>
  );
};

export default ObjectiveOverview;
