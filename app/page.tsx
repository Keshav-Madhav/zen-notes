import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="absolute flex space-x-2 items-center animate-pulse bottom-3.5 left-16 md:bottom-auto md:top-[7rem] md:left-auto">
      <ArrowLeftCircle className="w-8 h-8" />

      <h1 className="font-bold">Create your own zen note (Zen-dō)</h1>
    </main>
  );
}
