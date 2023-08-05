import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  title: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { to, title, onClick } = props;
  return (
    <li>
      <NavLink
        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-slate-800 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none "
        to={to}
        onClick={onClick}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
