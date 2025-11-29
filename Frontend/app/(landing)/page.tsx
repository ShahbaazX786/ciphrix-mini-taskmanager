import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";
import Hero from "@/components/custom/layout/hero";

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 w-full h-full">
      <Header hideAuthButtons={false} />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;
