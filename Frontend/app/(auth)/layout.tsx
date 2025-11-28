import { ReactChildren } from "@/utils/types/types";

const AuthLayout = ({ children }: ReactChildren) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-300 overflow-hidden">
      {children}
    </div>
  );
};

export default AuthLayout;
