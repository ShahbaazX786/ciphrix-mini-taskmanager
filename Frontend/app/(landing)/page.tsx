import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";
import Hero from "@/components/custom/layout/hero";
import Tesimonials from "@/components/custom/layout/testimonials";

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 w-full h-full">
      <Header hideAuthButtons={false} />
      <Hero />
      <Tesimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
