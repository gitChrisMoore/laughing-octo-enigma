import { useEffect, useState } from "react";
import { Func, FuncSchema } from "./FuncSchema";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const FUNCS_URI = "/api/funcs/";

// interface BasicFuncType {
//   [key: string]: {
//     type: string;
//     description: string;
//     items?:
//       | BasicFuncType
//       | {
//           type: string;
//           description: string;
//         };
//   };
// }

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

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}

      <div>
        <h1>Problem Solvers</h1>
        <div>
          <Button onClick={() => navigate("/problem-solver-overview/create")}>
            Add New Function
          </Button>
        </div>
        <div className="flex flex-col overflow-auto py-2 text-xs">
          {funcs.map((item, index) => (
            <div key={index} className="py-2">
              <div>
                <p className="whitespace-pre-line">{item.name}</p>
              </div>

              <div>
                <p className="whitespace-pre-line">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FuncList;
