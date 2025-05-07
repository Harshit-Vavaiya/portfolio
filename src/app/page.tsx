import { Contact } from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import { Highlights } from "./components/highlights/highlights";
import Navbar from "./components/navbar/navbar";
import AdditionalSkills from "./components/skills/additional_skills";
import Skills from "./components/skills/skills";

export default function Home() {
  return (
    <main className="">
      <Navbar></Navbar>
      <div className="flex flex-col gap-[130px]">
        <Hero></Hero>
        <Skills></Skills>
        <AdditionalSkills></AdditionalSkills>
        <Highlights></Highlights>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </main>
  );
}
