"use client";
import ats from "/public/images/ats.png";
import tag from "/public/images/tag.png";
import prost from "/public/images/prost.png";
import edith from "/public/images/edith.png";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

const data = [
  {
    title: "TAG",
    image: tag,
    description:
      "For students of graph theory. online platform to visualize and draw graphs and execute algorithms.",
    year: "2023",
    link: "#",
    tags: ["ReactJS", "GraphTheory", "Algorithms"],
  },
  {
    title: "ATS",
    image: ats,
    description:
      "A simple and minimal application tracking system to keep track of the jobs you apply to.",
    year: "2023",
    link: "https://github.com/Harshit-Vavaiya/ATS",
    tags: ["Spring", "Java", "PostgreSQL"],
  },
  {
    title: "Prost!",
    image: prost,
    description:
      "An online store for revellers and party hosts, buy alcoholic and non-alcoholic drinks.",
    year: "2022",
    link: "https://github.com/Harshit-Vavaiya/Prost",
    tags: ["Spring", "Java", "AWS", "Docker", "UniversityProject"],
  },

  {
    title: "Edith",
    image: edith,
    description:
      "My final year project in Bachelor's.  An AI assistant that can answer your any question with the help of generative model.",
    year: "2021",
    link: "https://github.com/Harshit-Vavaiya/Edith-A",
    tags: ["Python", "Flutter", "NLP", "GenerativeAI", "FinalYearProject"],
  },
];

export const Highlights: React.FC<any> = (props: any) => {
  return (
    <section className="h-auto w-[85vw]  m-auto flex flex-col gap-[60px] tracking-tight">
      <div className="text-4xl text-center font-medium">Highlights</div>
      <div className="flex flex-col gap-[60px]">
        {data.map((highlight, index) => {
          return (
            <HighlightCard
              key={index + "_highlight"}
              {...highlight}
            ></HighlightCard>
          );
        })}
      </div>
    </section>
  );
};

interface HighlightCardProps {
  image: StaticImageData;
  tags: Array<string>;
  title: string;
  year: string;
  description: string; // Change here to use description directly
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  image,
  tags,
  title,
  year,
  description,
}) => {
  const colors = [
    "#D2FF72",
    "#FF72F1",
    "#72FFAA",
    "#7BDFFF",
    "#FF7272",
    "#FFD772",
    "#DA72FF",
  ];

  const [color, setColor] = useState("#D2FF72");

  const getColor = () => {
    let curr = colors[Math.floor(Math.random() * colors.length)];

    while (curr === color) {
      curr = colors[Math.floor(Math.random() * colors.length)];
    }

    setColor(curr);
    return curr;
  };

  return (
    <>
      <div className="flex flex-col gap-[20px] md:flex-row md:items-center md:justify-center  md:gap-[30px] ">
        <div className="">
          {/* Image */}
          <Image
            src={image}
            alt="highlight_image"
            className="md:h-[160px] md:w-[258px] "
          ></Image>
        </div>
        <div className="flex flex-col gap-[20px] md:w-[50%] lg:w-[40%]  md:gap-[10px]">
          {/* Description */}
          <div className="text-sm w-[97%] md:text-xs">
            {tags.map((tag, index) => {
              let i = index % colors.length;
              return (
                <span key={tag} style={{ color: colors[i] }}>
                  {"#" + tag}
                </span>
              );
            })}
          </div>
          <div className="flex items-center justify-stretch w-full text-[#d7d7d7]">
            <span className="text-3xl font-bold flex-1">{title}</span>
            <span className="text-md font-extralight flex-1 text-right">
              {year}
            </span>
          </div>
          <div className="text-xl font-light text-[#d7d7d7]">{description}</div>
        </div>
      </div>
    </>
  );
};
