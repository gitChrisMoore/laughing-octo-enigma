import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const MainTemplate: React.FC<Props> = ({ ...props }) => {
  const { children } = props;
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
      <div className="flex flex-col min-h-screen max-w-2xl mx-auto">
        {" "}
        {/* added pt-16 */}
        <Navbar
          isNavDrawerExpanded={isNavDrawerExpanded}
          toggleNavDrawer={toggleNavDrawer}
          toggleSideSheet={toggleSideSheet}
          title="Sprout"
        />
        {/* <div className="container max-w-2xl mx-auto"> */}
        <div className="flex flex-col pt-6 pb-32">{children}</div>
      </div>
    </>
  );
};

export default MainTemplate;
