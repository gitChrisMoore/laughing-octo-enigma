import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import useAdmin from "./useAdmin";
import ViewEnvVariables from "./ViewEnvVariables";

const AdminOverview: React.FC = () => {
  const { threads, resetDatabase } = useAdmin();
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
        title="Admin"
      />
      <div className="flex justify-center">
        <div className="w-full px-3 max-w-2xl ">
          <div className="flex flex-col">
            <p className="py-4 text-lg font-semibold">Controls:</p>
            <p className="text-sm flex flex-col mb-4 font-light text-slate-700">
              <button
                onClick={resetDatabase}
                data-test-id="reset_database_button"
                className="w-full bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center"
              >
                <p className="m-2 text-center text-sm">Reset Database</p>
              </button>
            </p>
          </div>

          <ViewEnvVariables />
          <div className="flex flex-col border-b border-slate-300">
            <p className="py-4 text-lg font-semibold">AI Status:</p>

            <div className="container bg-white px-2 py-3">
              {threads.map((thread) => (
                <div className="mb-4" key={thread.thread_name}>
                  <p className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer">
                    {thread.thread_name.toUpperCase()}
                  </p>
                  <p className="text-sm flex flex-col mt-2 font-light text-slate-700 ">
                    {thread.thread_status ? "true" : "false"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
