"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { addNewCountSpaceItem } from "@/server/actions/countSpaceItem";
import { isLoading } from "@/utils/formHelpers";

const formSchema = z.object({
  description: z.string(),
  amount: z.coerce
    .number()
    .safe()
    .refine((val) => val !== 0, { message: "Amount can't be 0" }),
});

export function AddRecord({
  category,
  countSpaceCategoryId,
}: {
  category: string;
  countSpaceCategoryId: number;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  const router = useRouter();
  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: addNewCountSpaceItem,
    onSuccess: () => {
      form.reset();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { description, amount } = values;
    mutateAsync({ amount, name: description, countSpaceCategoryId });
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Record</DialogTitle>
          <DialogDescription>
            Create a new record for {category}
          </DialogDescription>
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
                Add record
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
