function IconLayoutBottombarExpand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      viewBox="0 0 24 24"
      height="2em"
      width="2em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M20 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2zM20 15H4" />
      <path d="M14 10l-2-2-2 2" />
    </svg>
  );
}

export default IconLayoutBottombarExpand;
