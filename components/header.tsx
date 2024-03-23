import { Github } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between px-10 py-4 bg-[#222] text-white ">
        <Logo />
        <Link href={'https://github.com/olivemonk'} target="_blank">
          <Button variant={"ghost"} className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <p>Olivemonk</p>
          </Button>
        </Link>
      </div>
      <hr />
    </>
  );
};

export default Header;
