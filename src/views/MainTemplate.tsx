import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SideSheet from "../components/SideSheet/SideSheet";

interface Props {
  navTitle: string;
  children: React.ReactNode;
  sideSheetTitle?: string;
  sideSheetContent?: React.ReactNode;
}

const MainTemplate: React.FC<Props> = ({ ...props }) => {
  const { navTitle, children, sideSheetContent, sideSheetTitle } = props;
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
      <div className="flex flex-col min-h-screen w-full max-w-2xl mx-auto">
        {" "}
        {/* added pt-16 */}
        <Navbar
          isNavDrawerExpanded={isNavDrawerExpanded}
          toggleNavDrawer={toggleNavDrawer}
          toggleSideSheet={toggleSideSheet}
          title={navTitle}
        />
        {/* <div className="container max-w-2xl mx-auto"> */}
        <div className="flex flex-col pt-12 pb-32">{children}</div>
        <div>
          {sideSheetContent && sideSheetTitle && (
            <SideSheet
              isExpanded={isSideSheetOpen}
              toggleIsExpanded={toggleSideSheet}
              title={sideSheetTitle}
            >
              {sideSheetContent}
            </SideSheet>
          )}
        </div>
      </div>
    </>
  );
};

export default MainTemplate;
