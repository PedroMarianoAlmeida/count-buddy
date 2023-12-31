"use client";
import { useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { isLoading } from "@/utils/formHelpers";
import { createNewCountSpace } from "@/server/actions/countSpace";
import { urlFormatter } from "@/utils/text";
import { CycleUnit } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(3),
  defaultCycleUnit: z.nativeEnum(CycleUnit),
  defaultCycle: z.number().int().positive(),
});
export function NewCountSpace() {
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      defaultCycleUnit: CycleUnit.MONTH,
      defaultCycle: 1,
    },
  });

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: createNewCountSpace,
    onSuccess: () => {
      form.reset();
      router.refresh();
      if (cancelButtonRef.current) {
        cancelButtonRef.current.click();
      }
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, defaultCycle, defaultCycleUnit } = values;
    const slug = urlFormatter(name);
    mutateAsync({ name, slug, defaultCycle, defaultCycleUnit });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Count Space</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Add new category</DialogDescription>
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
              name="defaultCycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cycle</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultCycleUnit"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* TODO: Pass this options to a .map with all values in ENUM */}
                      <SelectItem value="YEAR">Year</SelectItem>
                      <SelectItem value="MONTH">Month</SelectItem>
                      <SelectItem value="WEEK">Week</SelectItem>
                      <SelectItem value="DAY">Day</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading({ isIdle, isSuccess })}>
                Add Count Space
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
