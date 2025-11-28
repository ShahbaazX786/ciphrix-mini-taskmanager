import ThemeTogglerButton from "@/components/custom/theme-toggler";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-800 w-full h-full">
      <Link href={"/login"}>Login</Link>
      <Link href={"/signup"}>Signup</Link>
      <ThemeTogglerButton />
    </main>
  );
}
