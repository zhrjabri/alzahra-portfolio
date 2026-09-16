import Features from "@/components/home/Features";
import Opening from "@/components/home/Opening";
import { About, Contact, Journey, TechIndex } from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Opening />
      <Features />
      <TechIndex />
      <About />
      <Journey />
      <Contact />
    </>
  );
}
