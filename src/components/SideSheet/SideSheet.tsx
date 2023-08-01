interface SideSheetProps {
  children: React.ReactNode;
  isExpanded: boolean;
  toggleIsExpanded: () => void;
  title: string;
}

function IconClose() {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1.75em"
      width="1.75em"
    >
      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
    </svg>
  );
}

const SideSheet: React.FC<SideSheetProps> = ({ children, ...props }) => {
  const { isExpanded, toggleIsExpanded, title } = props;

  return (
    <div
      className={`${
        isExpanded ? "block" : "hidden" // Use "hidden" or "block" based on the state
      } absolute h-[calc(100vh)] right-0 max-w-xs w-full rounded-l-lg bg-slate-100 `}
    >
      <div className="flex flex-row justify-end px-5 py-4">
        <div className="flex flex-col grow">
          <p className="text-lg">{title}</p>
        </div>
        <div className="flex flex-col pl-3">
          <button
            className="flex flex-grow items-center"
            onClick={toggleIsExpanded}
          >
            <IconClose />
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow px-5 pt-4">{children}</div>
    </div>
  );
};

export default SideSheet;
