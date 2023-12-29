"use client";
import { use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

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
import { updateCountSpaceItem } from "@/server/actions/countSpaceItem";
import { isLoading } from "@/utils/formHelpers";
import { CountSpaceItemShared } from "@/components/Shared/HistoryTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const formSchema = z.object({
  description: z.string(),
  amount: z.coerce
    .number()
    .safe()
    .refine((val) => val !== 0, { message: "Amount can't be 0" }),
});

export function EditRecord({
  amount,
  id: countSpaceItemId,
  name,
}: CountSpaceItemShared) {
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: name ?? "",
      amount: amount,
    },
  });

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: updateCountSpaceItem,
    onSuccess: () => {
      form.reset();
      router.refresh();
      if (cancelButtonRef.current) {
        cancelButtonRef.current.click();
      }
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { description, amount } = values;
    mutateAsync({ amount, name: description, countSpaceItemId });
  }

  useEffect(() => {
    form.reset({
      description: name ?? "",
      amount: amount,
    });
  }, [name, amount, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Record</DialogTitle>
          <DialogDescription>Edit record</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="My new Tesla car" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: ADD DATE */}
            <DialogFooter>
              <Button type="submit" disabled={isLoading({ isIdle, isSuccess })}>
                Edit
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
