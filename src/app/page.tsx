import Hero from "@/components/home/Hero";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
