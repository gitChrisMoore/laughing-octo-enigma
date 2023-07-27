import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavBarRoutes } from "../../router/routes";

interface Props {
  to: string;
  title: string;
  onClick?: () => void;
}

const NavItem: React.FC<Props> = (props) => {
  const { to, title, onClick } = props;
  return (
    <li>
      <NavLink
        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
        to={to}
        onClick={onClick}
      >
        {title}
      </NavLink>
    </li>
  );
};

const NavIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginBottom: "2px" }}
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
};

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const divRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const toggleIsOpen = (e?: any) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: any) => {
      if (isExpanded && divRef.current && !divRef.current.contains(e.target)) {
        toggleIsOpen(e);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isExpanded]);

  return (
    <nav className="sticky pr-2 top-0 h-12 z-20 flex justify-between content-center bg-slate-100 white border-b border-slate-400">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="relative" data-te-dropdown-ref>
          <button
            onClick={toggleMenu}
            className="my-auto rounded-full h-10 w-10 text-sm flex justify-center items-center /
                                    focus:bg-stone-300 focus:outline-1 focus:outline-black /
                                    hover:bg-stone-300 hover:outline hover:outline-1 hover:outline-black "
          >
            <NavIcon />
          </button>

          <ul
            className={`${
              isExpanded ? "block" : "hidden" // Use "hidden" or "block" based on the state
            } absolute z-[1000] rounded-lg border-none dark:bg-neutral-700`}
          >
            <div ref={divRef}>
              {NavBarRoutes.map((route, index) => (
                <NavItem
                  key={index}
                  onClick={toggleMenu}
                  title={route.title}
                  to={route.to}
                />
              ))}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
