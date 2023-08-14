import { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
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
          <PageHeader headline={"Admin Dashboard"} />
          <button
            onClick={resetDatabase}
            data-test-id="reset_database_button"
            className="w-full bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center"
          >
            <p className="m-2 text-center text-sm">Reset Database</p>
          </button>
          <ViewEnvVariables />
          <div>
            {threads.map((thread) => (
              <div key={thread.thread_name}>
                <p>{thread.thread_name}</p>
                <p>{thread.thread_status ? "true" : "false"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
