const ViewEnvVariables: React.FC = () => {
  return (
    <div className="flex flex-col border-b border-slate-300">
      <p className="py-4 text-lg font-semibold">Environment Variables:</p>
      <ul
        className="flex flex-col border-b border-slate-300 overflow-y-auto max-h-[40vh]"
        data-test-id="objective_list"
      >
        {Object.keys(import.meta.env)
          .filter((key) => key.startsWith("VITE_"))
          .map((key) => (
            <li key={key} className="container bg-white px-2 py-3">
              <div className="text-sm flex flex-row font-light text-slate-700">
                <div className="flex flex-col py-2 justify-between ">
                  <p className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer">
                    {key.toUpperCase()}
                  </p>

                  {/* <label key={objective.id} className="flex items-center"> */}
                  <div className="text-sm flex flex-col font-light text-slate-700 break-all">
                    {import.meta.env[key]}
                  </div>
                </div>
              </div>
              {/* </label> */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewEnvVariables;
