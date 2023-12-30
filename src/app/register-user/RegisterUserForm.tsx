"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { urlFormatter } from "@/utils/text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterUserForm = () => {
  const [message, setMessage] = useState("");
  const [nameTreated, setNameTreated] = useState("");

  const formSchema = z.object({
    name: z.string().min(3), //.refine check BD,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const rawInput = form.watch("name");
  useEffect(() => {
    const nameTreated = urlFormatter(rawInput);
    setNameTreated(nameTreated);

    if (rawInput !== nameTreated) setMessage(`Name treated: ${nameTreated}`);
  }, [rawInput]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // const { description, amount } = values;
    // mutateAsync({ amount, name: description, countSpaceCategoryId });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="my-name" className="max-w-52" {...field} />
              </FormControl>
              <FormMessage>{message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};
export default RegisterUserForm;
