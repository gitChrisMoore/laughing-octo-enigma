import { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Navbar from "../../components/Navbar/Navbar";

const AdminColors: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="bg-primary text-primary_on p-2">Primary</div>
      <div className="bg-secondary text-secondary_on mt-1 p-2">Secondary</div>
    </div>
  );
};

const AdminOverview: React.FC = () => {
  const [isNavDrawerExpanded, setIsNavDrawerExpanded] = useState(false);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const toggleNavDrawer = () => {
    setIsNavDrawerExpanded(!isNavDrawerExpanded);
  };

  const toggleSideSheet = () => {
    setIsSideSheetOpen(!isSideSheetOpen);
  };

  const handleResetDatabase = async () => {
    try {
      const response = await fetch("/api/admin/reset_database", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        console.log("status: handleResetDatabase success");
      } else {
        console.log("status: handleResetDatabase error");
        console.log(response.status);
      }
    } catch (error) {
      console.log("status: handleResetDatabase error");
      console.log(error);
    }
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
            onClick={handleResetDatabase}
            className="w-full bg-slate-500 mt-2 text-white rounded-lg flex justify-center items-center"
          >
            <p className="m-2 text-center text-sm">Reset Database</p>
          </button>
          <AdminColors />
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
