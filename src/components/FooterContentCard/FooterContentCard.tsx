import { FooterContentCardProps } from "../../views/Sprout/Objective/ObjectiveForm";

export const FooterContentCard: React.FC<FooterContentCardProps> = ({
  ...props
}) => {
  const { children } = props;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-100 z-10">
      <div className="mx-4 ">
        <div className="my-4 text-sm flex flex-col font-light text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};
