"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const isSignedIn = false;

  return (
    <section id="hero">
      <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1 className="text-gray-800 dark:text-white">The Best</h1>
          <div className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 py-3">
            <Typewriter
              options={{
                strings: [
                  "Task Manager",
                  "Place to Track Tasks",
                  "Productivity Tool",
                  "Task Planner",
                  "To-Do List",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 40,
                delay: 50,
              }}
            />
          </div>
        </div>
        <p className="text-sm md:text-xl font-light text-black dark:text-zinc-400">
          Increase your productivity by <b className="font-bold">10x</b> using
          the{" "}
          <span className="font-bold bg-linear-to-b from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Pro{" "}
          </span>
          Plan
        </p>
        <div>
          <Link href={isSignedIn ? "/dashboard" : "/signup"}>
            <Button
              variant={"premium"}
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold cursor-pointer hover:rotate-1 hover:scale-105"
            >
              Start For Free Now!
            </Button>
          </Link>
        </div>
        <div className="text-black dark:text-zinc-400 text-xs md:text-sm font-normal">
          No Credit Card Required*
        </div>
      </div>
    </section>
  );
};

export default Hero;
