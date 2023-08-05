import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FuncList from "./FuncList";

const FuncOverview: React.FC = () => {
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
      {/* Nav */}
      <Navbar
        isNavDrawerExpanded={isNavDrawerExpanded}
        toggleNavDrawer={toggleNavDrawer}
        toggleSideSheet={toggleSideSheet}
        title="Sprout"
      />
      {/* Content */}

      <div className="flex justify-center">
        <div className="w-full px-3 max-w-2xl ">
          <FuncList />
        </div>
      </div>
    </>
  );
};

export default FuncOverview;
