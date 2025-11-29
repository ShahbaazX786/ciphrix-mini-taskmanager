import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";
import { ReactChildren } from "@/utils/types";

const AuthLayout = ({ children }: ReactChildren) => {
  return (
    <div className="w-full h-full bg-gray-300 overflow-hidden">
      <Header hideAuthButtons={true} />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
