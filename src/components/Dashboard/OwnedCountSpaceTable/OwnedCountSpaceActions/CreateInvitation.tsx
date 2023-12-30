"use client";
import { useRef, useState } from "react";
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
import { isLoading } from "@/utils/formHelpers";
import { addUserInvitationToCountSpace } from "@/server/actions/userInvitedToCountSpace";

const formSchema = z.object({
  invitedName: z.string().min(3),
});

export function CreateInvitation({ countSpaceId }: { countSpaceId: number }) {
  const [formMessage, setFormMessage] = useState("");
  const router = useRouter();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invitedName: "",
    },
  });

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: addUserInvitationToCountSpace,
    onSuccess: (data) => {
      if (!data.success) {
        const { message } = data;
        setFormMessage(message);
      } else {
        form.reset();
        router.refresh();
        if (cancelButtonRef.current) {
          cancelButtonRef.current.click();
        }
      }
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { invitedName } = values;
    mutateAsync({ countSpaceId, guestName: invitedName });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Invite</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Guest</DialogTitle>
          <DialogDescription>
            Invite a guest to your Count Space
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="invitedName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="guest-name" {...field} />
                  </FormControl>
                  <FormMessage>{formMessage}</FormMessage>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading({ isIdle, isSuccess })}>
                Create Invite
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
