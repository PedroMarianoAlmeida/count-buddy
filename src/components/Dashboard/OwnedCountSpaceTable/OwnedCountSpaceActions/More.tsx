"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// TODO: Implement the actions
const More = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant="link" className="w-full">
            Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="link" className="w-full">
            Add Guest
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="link" className="w-full">
            Delete
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default More;
