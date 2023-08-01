import { useState } from "react";
import GenericConvoSSE from "./GenericConvoSSE";
import GenericConvoTrendWidget from "./GenericConvoTrendWidget";
import SideSheet from "../../../components/SideSheet/SideSheet";

function IconDependabot16() {
  return (
    <svg
      // fill="bg-white-500"
      // stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      // strokeWidth={1}
      viewBox="0 0 16 16"
      height="1.2em"
      width="1.2em"
      // {...props}
    >
      <path d="M5.75 7.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm5.25.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
      <path
        fillRule="evenodd"
        d="M6.25 0a.75.75 0 000 1.5H7.5v2H3.75A2.25 2.25 0 001.5 5.75V8H.75a.75.75 0 000 1.5h.75v2.75a2.25 2.25 0 002.25 2.25h8.5a2.25 2.25 0 002.25-2.25V9.5h.75a.75.75 0 000-1.5h-.75V5.75a2.25 2.25 0 00-2.25-2.25H9V.75A.75.75 0 008.25 0h-2zM3 5.75A.75.75 0 013.75 5h8.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75v-6.5z"
      />
    </svg>
  );
}

const GenericConvoOverview: React.FC = () => {
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(true);

  const toggleSideSheet = () => {
    setIsSideSheetOpen(!isSideSheetOpen);
  };

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}
      <div className="flex flex-col px-3">
        <div className="flex justify-between bg-slate-200 h-10 items-center ">
          <div>Title</div>
          <div>
            <button
              className="bg-violet-500 border border-slate-800 p-1 rounded-full shadow "
              onClick={toggleSideSheet}
            >
              <IconDependabot16 />
            </button>
          </div>
        </div>
        <GenericConvoSSE />
        <div className="flex ">{/* <GenericConvoSSE /> */}</div>

        <SideSheet
          isExpanded={isSideSheetOpen}
          toggleIsExpanded={toggleSideSheet}
          title={"Trends"}
        >
          <GenericConvoTrendWidget />
        </SideSheet>
      </div>
    </>
  );
};

export default GenericConvoOverview;
