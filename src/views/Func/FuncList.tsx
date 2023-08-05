import { useEffect, useState } from "react";
import { Func, FuncSchema } from "./FuncSchema";
import { useNavigate } from "react-router-dom";
import TwoLineListItem from "../../components/ListItems/TwoLineListItem";
import PageHeader from "../../components/PageHeader/PageHeader";

const FUNCS_URI = "/api/funcs/";

const FuncList: React.FC = () => {
  const [funcs, setFuncs] = useState<Func[]>([]);
  const navigate = useNavigate();

  const handleGetFuncs = async () => {
    try {
      const response = await fetch(FUNCS_URI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          crossDomain: "true",
        },
      });

      if (response.status === 200) {
        const new_problem_solvers = [];
        const res = await response.json();
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          const func = FuncSchema.parse(res[i]);
          new_problem_solvers.push(func);
        }

        setFuncs(new_problem_solvers);
        console.log("status: handleGetFuncs success");
      } else {
        console.log("status: handleGetFuncs error");
        console.log(response.status);
      }
    } catch (error) {
      console.log("status: handleGetFuncs error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFuncs();
  }, []);

  const headline = "Objectives";
  const supportingText = `
  These are your magic spells; these direct the AI to perform a specific task whenever you need it. 
  When a objective is defined, the AI will structure all of their responses to fit the specified format.
  `;

  return (
    <>
      <div className="flex flex-col">
        <PageHeader headline={headline} supportingText={supportingText} />

        <p className="text-base mt-4 ">Objectives:</p>
        {funcs.map((item, index) => (
          <div key={index} className="py-2">
            <TwoLineListItem
              headline={item.name}
              supportingText={item.description}
            />
          </div>
        ))}

        <div className="mt-4">
          <button
            onClick={() => navigate("/func-overview/create")}
            className="bg-slate-500 w-full text-white rounded-full justify-center items-center"
          >
            <p className="m-2 text-center text-sm">Add Objective</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FuncList;
