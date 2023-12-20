import Image from "next/image";
import bg from "/public/images/hero_mobile.png";
import bg_1 from "/public/images/hero_laptop.png";
import { PT_Sans_Narrow } from "next/font/google";
import "./hero.css";
Label;
const narrow = PT_Sans_Narrow({ subsets: ["latin"], weight: ["400", "700"] });

export default function Hero(props: any) {
  return (
    <section className="h-auto w-[85vw] m-auto flex flex-col gap-[40px] tracking-tight">
      <div>
        <Image
          className="block md:hidden"
          src={bg}
          alt="Hero"
          height={333}
          width={390}
          priority
        />
        <Image
          className="hidden md:block"
          src={bg_1}
          alt="Hero"
          height={528.941}
          width={1381}
          priority
        />
      </div>
      <div
        className={`${narrow.className}  flex flex-col md:flex-row gap-2 font-bold text-7xl lg:text-8xl`}
      >
        <span>Hallo! I&apos;m</span>
        <span className="label">Harshit</span>
      </div>
      <div className="text-2xl   text-[#6C6464] leading-relaxed lg:text-[33px] lg:leading-relaxed lg:w-[90%]">
        I am a <Label color="text-[#C8346B]">Full stack developer</Label>. I
        live in the lovely town of{" "}
        <Label color="text-[#C84F34]">Bamberg, Germany</Label> 🏠. I am doing my{" "}
        <Label color="text-[#B7C499]">master&apos;s in software systems</Label>{" "}
        at{" "}
        <Label color="text-[#CFB55A]">Otto-Friedrich Universität Bamberg</Label>{" "}
        🎓. Working with{" "}
        <Label color="text-[#CB74C3]">
          algorithms, building beautiful websites
        </Label>{" "}
        and <Label color="text-[#C8346B]">efficient software</Label> is my drive
        ✨.
      </div>
    </section>
  );
}

function Label(props: any) {
  return <span className={`${props.color}`}>{props.children}</span>;
}
