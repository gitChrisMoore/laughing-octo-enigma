import { useState } from "react";
import IconDown from "../Icons/IconDown";
import IconUp from "../Icons/IconUp";

type AccordionProps = {
  headline: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ headline, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    console.log("toggleOpen");
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b mt-2 pb-2 mb-2 rounded-md">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full"
      >
        <p className="text-sm ">{headline}</p>

        {/* {isOpen ? "Collapse" : "Expand"} */}
        {isOpen ? <IconDown /> : <IconUp />}
      </button>
      {isOpen && <div className="font-light text-sm mt-1">{children}</div>}
    </div>
  );
};

export default Accordion;
