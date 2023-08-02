type AvatarProps = {
  children?: React.ReactNode;
  backgroundColor?: string; // New prop to specify the background color class
};

const Avatar = ({
  children,
  backgroundColor = "bg-slate-500",
}: AvatarProps) => {
  const avatarStyle = `rounded-full border-2 border-white text-white ${backgroundColor}`;
  return (
    <div
      className={`h-8 w-8 mr-1 flex items-center justify-center ${avatarStyle}`}
    >
      <span className="text-xs">{children}</span>
    </div>
  );
};

export default Avatar;
