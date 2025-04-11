"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import stringToColor from "@/lib/stringToColor";

export default function Home() {
  const color = stringToColor("senthamizh764@gmail.com");
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-bold">Get Started with Creating a new Document</h1>
    </main>
  );
}
