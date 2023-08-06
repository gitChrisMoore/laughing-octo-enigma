function IconLayoutNavbarExpand(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 18V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2zM4 9h16" />
      <path d="M10 14l2 2 2-2" />
    </svg>
  );
}
export default IconLayoutNavbarExpand;
