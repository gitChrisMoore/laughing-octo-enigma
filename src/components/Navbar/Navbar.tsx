import { useEffect, useRef } from "react";
import { NavBarRoutes } from "../../router/routes";
import NavIcon from "../Icons/NavIcon";
import NavItem from "./NavItem";
import IconDependabot16 from "../Icons/IconDependabot16";

interface NavbarProps {
  isNavDrawerExpanded: boolean;
  toggleNavDrawer: () => void;
  toggleSideSheet: () => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { isNavDrawerExpanded, toggleNavDrawer, toggleSideSheet } = props;

  const toggleMenu = () => {
    toggleNavDrawer();
  };

  const divRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const toggleIsOpen = (e?: any) => {
    e.preventDefault();
    toggleNavDrawer();
  };

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: any) => {
      if (
        isNavDrawerExpanded &&
        divRef.current &&
        !divRef.current.contains(e.target)
      ) {
        toggleIsOpen(e);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isNavDrawerExpanded]);

  return (
    <nav className="sticky pr-2 top-0 h-14 z-20 flex justify-between content-center bg-slate-100 white ">
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
            className={`fixed h-[calc(100vh)] transform ease-in-out transition-all duration-300 top-0 left-0 md:max-w-sm max-w-[80%] w-full bg-white overflow-auto z-30 ${
              isNavDrawerExpanded ? "translate-x-0" : "-translate-x-full" // Use "hidden" or "block" based on the state
            }`}
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
        <div>Hatch</div>
        <div>
          {" "}
          <button
            className="bg-violet-500 border border-slate-800 p-1 rounded-full shadow "
            onClick={toggleSideSheet}
          >
            <IconDependabot16 />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
