"use client";

import { JSX } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/lib/api/api.task";

const DeleteAlert = ({ trigger, id }: { trigger: JSX.Element; id: string }) => {
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: (res) => {
      if (res?.success) {
        console.warn("Task Deleted Sucessfully");
      } else {
        console.warn("Something went wrong i guess", res?.message);
      }
    },
    onError: (err: any) => {
      console.warn("Error", err?.response?.data?.message);
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
