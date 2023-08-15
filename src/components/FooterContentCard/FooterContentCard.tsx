import { FooterContentCardProps } from "../../views/Sprout/Objective/ObjectiveForm";

export const FooterContentCard: React.FC<FooterContentCardProps> = ({
  ...props
}) => {
  const { children } = props;
  return (
    <div className="fixed bottom-0 left-0 w-full z-20 bg-slate-200">
      <div className="mx-4 ">
        {/* <div className="my-4 text-sm flex flex-col font-light text-slate-700  bg-red-500"> */}
        <div className="my-4 text-sm flex flex-col font-light text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};
