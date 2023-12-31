import { useEffect, useRef } from "react";
import NavIcon from "../Icons/NavIcon";
import NavItem from "./NavItem";
import IconDependabot16 from "../Icons/IconDependabot16";

interface NavbarProps {
  isNavDrawerExpanded: boolean;
  toggleNavDrawer: () => void;
  toggleSideSheet: () => void;
  title: string;
}

export const RoutesHatch = [
  {
    title: "CEO Advisor",
    to: "/advisor-ceo",
  },
];

export const RoutesSprout = [
  {
    title: "Blueprints",
    to: "/blueprint-overview",
  },
  {
    title: "Objectives",
    to: "/objective-overview",
  },
];

export const RoutesAdmin = [
  {
    title: "admin-overview",
    to: "/admin-overview",
  },
];

const Navbar: React.FC<NavbarProps> = (props) => {
  const { title, isNavDrawerExpanded, toggleNavDrawer, toggleSideSheet } =
    props;

  const toggleMenu = () => {
    toggleNavDrawer();
  };

  const divRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  // const toggleIsOpen = (e?: any) => {
  //   e.preventDefault();
  //   toggleNavDrawer();
  // };

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: any) => {
      if (
        isNavDrawerExpanded &&
        divRef.current &&
        !divRef.current.contains(e.target)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isNavDrawerExpanded]);

  return (
    <nav className="fixed h-12 top-0 left-0 w-full pr-2 z-10 flex items-center justify-between content-center bg-slate-100">
      <div className="flex flex-row w-full items-center justify-between px-3">
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
            className={`fixed h-[calc(100vh)] pl-4 transform ease-in-out transition-all duration-300 top-14 left-0 md:max-w-sm max-w-[80%] w-full bg-white overflow-auto z-30 ${
              isNavDrawerExpanded ? "translate-x-0" : "-translate-x-full" // Use "hidden" or "block" based on the state
            }`}
          >
            <p className="ml-2 mt-2 font-semibold">Hatch</p>
            <div ref={divRef}>
              {RoutesHatch.map((route, index) => (
                <NavItem
                  key={index}
                  onClick={toggleMenu}
                  title={route.title}
                  to={route.to}
                />
              ))}
              <p className="ml-2 mt-2 font-semibold">Sprout</p>
              {RoutesSprout.map((route, index) => (
                <NavItem
                  key={index}
                  onClick={toggleMenu}
                  title={route.title}
                  to={route.to}
                />
              ))}
              <p className="ml-2 mt-2 font-semibold">Admin</p>
              {RoutesAdmin.map((route, index) => (
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
        <div>{title}</div>
        <div>
          {" "}
          <button
            className="bg-third border border-third_on text-third_on p-2 rounded-full shadow"
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
