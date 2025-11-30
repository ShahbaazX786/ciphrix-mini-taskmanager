"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createTask, updateTask } from "@/lib/api/api.task";
import { editTaskSchema, newTaskSchema } from "@/lib/schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const TashSheet = ({
  trigger,
  mode,
}: {
  trigger: JSX.Element;
  mode: "edit" | "new";
}) => {
  const isEdit = mode === "edit";
  const taskSchema = isEdit ? editTaskSchema : newTaskSchema;

  const taskForm = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: z.infer<typeof taskSchema>) => createTask(data),
    onSuccess: (res) => {
      if (res?.success) {
        console.warn("Task Created Sucessfully");
      } else {
        console.warn("Something went wrong i guess", res?.message);
      }
    },
    onError: (err: any) => {
      console.warn("Error", err?.response?.data?.message);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: z.infer<typeof taskSchema>) => updateTask(data),
    onSuccess: (res) => {
      if (res?.success) {
        console.warn("Task Updated Sucessfully");
      } else {
        console.warn("Something went wrong i guess", res?.message);
      }
    },
    onError: (err: any) => {
      console.warn("Error", err?.response?.data?.message);
    },
  });

  const onFormSubmit = (data: z.infer<typeof taskSchema>) => {
    return isEdit
      ? updateTaskMutation.mutate(data)
      : createTaskMutation.mutate(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-[80%] md:w-[540px] h-full overflow-y-auto">
        <form
          onSubmit={taskForm.handleSubmit(onFormSubmit)}
          className="flex flex-col justify-between h-full px-4"
        >
          <SheetHeader className=" px-0">
            <SheetTitle className="capitalize">{mode} Task</SheetTitle>
            <SheetDescription>
              {isEdit ? "Make changes to your Task" : "Create your new Task "}
              here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder="Read Baki Latest Chapter"
                {...taskForm.register("title")}
              />
              {taskForm.formState.errors.title && (
                <p className="text-red-500 text-xs text-left">
                  {taskForm.formState.errors.title.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                rows={5}
                placeholder="Chapter was good initially, but went downhill after 5 panels."
                {...taskForm.register("description")}
              />
              {taskForm.formState.errors.description && (
                <p className="text-red-500 text-xs text-left">
                  {taskForm.formState.errors.description.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select {...taskForm.register("status")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select task status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              {taskForm.formState.errors.status && (
                <p className="text-red-500 text-xs text-left">
                  {taskForm.formState.errors.status.message}
                </p>
              )}
            </Field>
          </FieldGroup>
          <SheetFooter className="p-0 pb-4 pt-8 mt-auto">
            <Button type="submit" className="cursor-pointer">
              {isEdit ? "Save Changes" : "Create Task"}
            </Button>
            <SheetClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TashSheet;
