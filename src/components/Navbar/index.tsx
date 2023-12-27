import Link from "next/link";

import { Button } from "@/components/ui/button";
import Menu from "./Menu";

const Navbar = () => (
  <header className="flex justify-between items-center px-4 md:px-6 lg:px-8 bg-secondary">
    <div >
      <Link href="/">
        <Button variant="ghost">
          Count Buddy
        </Button>
      </Link>
    </div>
    <div className="flex-none">
      <Menu />
    </div>
  </header>
);

export default Navbar;