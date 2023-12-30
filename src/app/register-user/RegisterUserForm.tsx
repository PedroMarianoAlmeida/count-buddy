"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";

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
import { checkUserNameExists, postNewUserName } from "@/server/actions/user";
import { isLoading } from "@/utils/formHelpers";

const formSchema = z.object({
  name: z.string().min(3),
});

const RegisterUserForm = () => {
  const [message, setMessage] = useState("");
  const [nameTreated, setNameTreated] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { data: isUsernameInUse, isLoading: isCheckUsernameLoading } = useQuery(
    {
      queryKey: ["user", nameTreated],
      queryFn: () => checkUserNameExists({ username: nameTreated, min: 3 }),
    }
  );

  useEffect(() => {
    if (isCheckUsernameLoading) return;
    if (isUsernameInUse?.success) {
      if (isUsernameInUse.result.exist) {
        setMessage(`${nameTreated} is already in use`);
      } else {
        setMessage(`${nameTreated} is available`);
      }
    } else setMessage("");
  }, [nameTreated, isUsernameInUse]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const rawInput = form.watch("name");

  useEffect(() => {
    if (isCheckUsernameLoading) setIsSubmitDisabled(true);
    else if (message === "") setIsSubmitDisabled(true);
    else if (message === `${nameTreated} is available`)
      setIsSubmitDisabled(false);
  }, [isCheckUsernameLoading, message, rawInput]);

  useEffect(() => {
    const nameTreated = urlFormatter(rawInput);
    setNameTreated(nameTreated);

    if (rawInput !== nameTreated) setMessage(`Name treated: ${nameTreated}`);
  }, [rawInput]);

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: postNewUserName,
    onSuccess: () => {
      form.reset();
      console.log("success");
      // useRouter is not working, so I'm using window.location.href
      window.location.href = "/";
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync({ username: nameTreated });
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

        <Button
          type="submit"
          disabled={isSubmitDisabled || isLoading({ isIdle, isSuccess })}
        >
          Register
        </Button>
      </form>
    </Form>
  );
};
export default RegisterUserForm;
