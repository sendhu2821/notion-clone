import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-2">
      Let's build an AI Website
      <Button>Click me</Button>
    </main>
  );
}
