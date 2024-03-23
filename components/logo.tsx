import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { CandlestickChart } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2 ">
      <CandlestickChart/>
      <p className={cn("font-semibold", font.className)}>2D</p>
    </div>
  );
};

export default Logo;