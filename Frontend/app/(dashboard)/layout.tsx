import { ReactChildren } from "@/utils/types";

const DashboardLayout = ({ children }: ReactChildren) => {
  return (
    <div className="w-full h-full bg-gray-300 overflow-hidden">{children}</div>
  );
};

export default DashboardLayout;
