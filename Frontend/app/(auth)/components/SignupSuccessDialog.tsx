"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const SignupSuccessDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Verified!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between items-center gap-4">
          <CircleCheck size={100} color="green" strokeWidth={2.5} />
          <p className="text-center font-bold text-lg">Welcome to the club!</p>
          <p className="text-center">
            Redirecting you back to the homepage... please log back in to ensure
            smoother experience
          </p>
        </div>
        <DialogFooter className="flex justify-center items-center mx-auto">
          <DialogClose asChild>
            <Button onClick={() => router.push("/login")}>
              Continue to login
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignupSuccessDialog;
