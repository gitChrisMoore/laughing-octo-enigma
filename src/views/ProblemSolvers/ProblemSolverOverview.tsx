import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProblemSolverList from "./ProblemSolverList";

const ProblemSolverOverview: React.FC = () => {
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
      <div className="flex justify-center">
        <div className="w-full px-3 max-w-2xl ">
          <ProblemSolverList />
        </div>
      </div>
    </>
  );
};

export default ProblemSolverOverview;
