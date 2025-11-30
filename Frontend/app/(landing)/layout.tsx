import { ReactChildren } from "@/lib/types";

const LandingLayout = ({ children }: ReactChildren) => {
  return (
    <div className="w-full h-full bg-gray-300 overflow-hidden">{children}</div>
  );
};

export default LandingLayout;
