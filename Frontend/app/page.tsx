import Footer from "@/components/custom/layout/footer";
import Header from "@/components/custom/layout/header";

export default function Home() {
  return (
    <>
      <Header hideAuthButtons={false} />
      <main className="bg-white dark:bg-gray-800 w-full h-full"></main>
      <Footer />
    </>
  );
}
