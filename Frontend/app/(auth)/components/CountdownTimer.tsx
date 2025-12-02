"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const CountdownTimer = () => {
  const otpExpiryTime = Number(process.env.NEXT_PUBLIC_OTP_EXPIRY);
  const [timeLeft, setTimeLeft] = useState(otpExpiryTime || 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCountdown]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  return (
    <p className="text-black dark:text-white">
      {timeLeft ? (
        <span>
          OTP expires in{" "}
          <span
            className={cn({
              "text-red-500": timeLeft < 60,
              "text-yellow-500": timeLeft >= 60 && timeLeft < 90,
              "text-black dark:text-white": timeLeft >= 180,
            })}
          >
            {formatTime(timeLeft)}
          </span>
        </span>
      ) : (
        <span>OTP Expired....</span>
      )}
    </p>
  );
};

export default CountdownTimer;
