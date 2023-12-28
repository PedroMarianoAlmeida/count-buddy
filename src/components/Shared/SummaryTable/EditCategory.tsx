"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isLoading } from "@/utils/formHelpers";
import { category } from "@/utils/formValidation";
import { updateCountSpaceCategory } from "@/server/actions/countSpaceCategory";

export function EditCategory({
  category: categoryName,
  countSpaceCategoryId,
  budget,
  unit,
}: {
  category: string;
  countSpaceCategoryId: number;
  budget: number | null;
  unit: string | null;
}) {
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof category>>({
    resolver: zodResolver(category),
    defaultValues: {
      budget: budget ?? 0,
      unit: unit ?? "",
      name: categoryName,
    },
  });

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: updateCountSpaceCategory,
    onSuccess: () => {
      form.reset();
      router.refresh();
      if (cancelButtonRef.current) {
        cancelButtonRef.current.click();
      }
    },
  });
  function onSubmit(values: z.infer<typeof category>) {
    const { budget, unit, name } = values;
    mutateAsync({ budget, unit, name, countSpaceCategoryId });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit </DialogTitle>
          <DialogDescription>
            Create a new record for {categoryName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="$, bananas, etc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading({ isIdle, isSuccess })}>
                Edit category
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary" ref={cancelButtonRef}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
