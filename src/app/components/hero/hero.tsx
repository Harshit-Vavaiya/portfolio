"use client";

import Image from "next/image";

import bg from "/public/images/hero_mobile.png";
import bg_1 from "/public/images/hero_laptop.png";
import { PT_Sans_Narrow } from "next/font/google";
import "./hero.css";
import { useEffect } from "react";

import gsap from "gsap";
import SplitType from "split-type";

const narrow = PT_Sans_Narrow({ subsets: ["latin"], weight: ["400", "700"] });

export default function Hero(props: any) {
  // const handleImageLoad = (event: any) => {
  //   const hero_mobile = document.getElementById("hero_img");
  //   const hero_laptop = document.getElementById("hero_img_md");
  //   gsap.fromTo(
  //     hero_mobile,
  //     { scale: 0.8, delay: 0.1, duration: 1, ease: "power2.out" },
  //     { scale: 1 }
  //   );
  //   gsap.fromTo(
  //     hero_laptop,
  //     { scale: 0.9, delay: 0.1, duration: 1, ease: "power2.out" },
  //     { scale: 1 }
  //   );
  // };

  useEffect(() => {
    const hero_mobile = document.getElementById("hero_img");
    const hero_laptop = document.getElementById("hero_img_md");
    const hero_text = document.getElementById("herotext");

    gsap.fromTo(
      hero_mobile,
      { scale: 1.2, delay: 0 },
      { scale: 1, delay: 0, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      hero_laptop,
      { scale: 1.2, delay: 0 },
      { scale: 1, delay: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      hero_text,
      {
        y: 100,
        ease: "power4.out",
        delay: 0.1,
        skewY: 1,
        stagger: {
          amount: 0.3,
        },
      },
      { y: 0 }
    );
  }, []);

  return (
    <section className="h-auto w-[85vw] m-auto flex flex-col gap-[40px] tracking-tight">
      <div>
        <Image
          id="hero_img"
          className="block md:hidden"
          src={bg}
          alt="Hero"
          height={333}
          width={390}
          priority
        />
        <Image
          className="hidden md:block"
          id="hero_img_md"
          src={bg_1}
          alt="Hero"
          height={528.941}
          width={1381}
          priority
        />
      </div>
      <div
        id="herotext"
        className={`${narrow.className}  flex flex-col md:flex-row gap-2 font-bold text-7xl lg:text-8xl lg:gap-4`}
      >
        <span>Hallo! I&apos;m</span>
        <span className="label">Harshit</span>
      </div>
      <div className="text-2xl  font-semibold  text-[#57606a] leading-normal lg:text-[38px] lg:leading-tight lg:w-[90%] text">
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
