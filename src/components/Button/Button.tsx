interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="hover:bg-blue-400 group flex items-center rounded-xl bg-sky-500 text-white text-xs font-medium pl-2 pr-3 py-"
    >
      {children}
    </button>
  );
};

export default Button;
