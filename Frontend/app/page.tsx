import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/login"}>Login</Link>
      <Link href={"/signup"}>Signup</Link>
    </main>
  );
}
