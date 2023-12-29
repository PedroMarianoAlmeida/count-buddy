import Link from "next/link";

import { Button } from "@/components/ui/button";
import Menu from "./Menu";

const Navbar = () => (
  <>
    <header className="flex justify-between items-center px-4 md:px-6 lg:px-8 bg-secondary fixed top-0 w-full z-10 h-14">
      <div>
        <Link href="/">
          <Button variant="ghost">Count Buddy</Button>
        </Link>
      </div>
      <div className="flex-none">
        <Menu />
      </div>
    </header>
    <div className="h-14" />
  </>
);

export default Navbar;
