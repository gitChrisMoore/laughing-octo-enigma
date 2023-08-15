type MainContentCardProps = {
  header: string;
  children?: React.ReactNode;
};

export const MainContentCard: React.FC<MainContentCardProps> = ({
  ...props
}) => {
  const { header, children } = props;
  return (
    <div className="flex flex-col border-b border-slate-300">
      <div className="mx-4 ">
        <p className="text-xl font-semibold">{header}</p>
        <div className="my-4 text-sm flex flex-col font-light text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};
