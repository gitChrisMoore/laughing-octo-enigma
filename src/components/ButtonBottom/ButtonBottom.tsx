interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary";
  // onClick?: () => void;
}

const ButtonBottom: React.FC<ButtonProps> = ({
  variant,
  children,
  ...props
}) => {
  let buttonClass;

  switch (variant) {
    case "primary":
      buttonClass = "bg-primary text-white";
      break;
    case "secondary":
      buttonClass = " text-primary border border-primary";
      break;
    case "tertiary":
      buttonClass = "bg-green-500 hover:bg-green-700 text-white";
      break;
  }
  return (
    // <div className="fixed bottom-0 w-full ">
    <button
      className={`py-2 px-4 my-1 ${buttonClass} text-sm w-full rounded-lg  `}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonBottom;
