"use client";

import { useState } from "react";
import Image from "next/image";
import tailwind from "/public/images/tailwind.png";
import next from "/public/images/next.png";
import react from "/public/images/react.png";
import docker from "/public/images/docker.png";
import mongo from "/public/images/mongo.png";
import python from "/public/images/python.png";
import postgre from "/public/images/postgre.png";
import aws from "/public/images/aws.png";
import node from "/public/images/node.png";
import js from "/public/images/js.png";
import mysql from "/public/images/mysql.png";
import gcp from "/public/images/gcp.png";
import spring from "/public/images/spring.png";
import java from "/public/images/java.png";
import redis from "/public/images/redis.png";
import git from "/public/images/git.png";

import "./skills.css";

export default function Skills(props: any) {
  return (
    <section className="h-auto w-[85vw] m-auto flex flex-col gap-[40px] tracking-tight">
      <div className="flex flex-col gap-[60px] md:hidden">
        <div className="text-2xl w-[90%] m-auto  text-center  text-[#6C6464] leading-relaxed">
          &ldquo;Skills shape the path, versatility paves the way.&rdquo;
        </div>
        <div className="flex flex-col gap-5 m-auto">
          <div className="flex gap-5">
            <Tooltip label={"React Js"} img={react}></Tooltip>
            <Tooltip label={"Tailwind CSS"} img={tailwind}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"Next Js"} img={next}></Tooltip>
            <Tooltip label={"Python"} img={python}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"MongoDB"} img={mongo}></Tooltip>
            <Tooltip label={"Docker"} img={docker}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"PostgreSQL"} img={postgre}></Tooltip>
            <Tooltip label={"AWS Cloud"} img={aws}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"Node Js"} img={node}></Tooltip>
            <Tooltip label={"JavaScript"} img={js}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"Spring Java"} img={spring}></Tooltip>
            <Tooltip label={"Java"} img={java}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"MySQL"} img={mysql}></Tooltip>
            <Tooltip label={"Google Cloud Platform"} img={gcp}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"Redis"} img={redis}></Tooltip>
            <Tooltip label={"Git"} img={git}></Tooltip>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-[80px] ">
        <div className="flex flex-col gap-5 m-auto items-center">
          <div className="flex gap-5">
            <Tooltip label={"React Js"} img={react}></Tooltip>
            <Tooltip label={"Tailwind CSS"} img={tailwind}></Tooltip>

            <Tooltip label={"Next Js"} img={next}></Tooltip>
            <Tooltip label={"Python"} img={python}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"MongoDB"} img={mongo}></Tooltip>
            <Tooltip label={"Docker"} img={docker}></Tooltip>

            <Tooltip label={"PostgreSQL"} img={postgre}></Tooltip>
            <Tooltip label={"AWS Cloud"} img={aws}></Tooltip>
          </div>
          <div className="text-2xl lg:text-3xl my-6 w-[100%] m-auto  text-center  text-white leading-relaxed">
            &ldquo;Skills shape the path, versatility paves the way.&rdquo;
          </div>

          <div className="flex gap-5">
            <Tooltip label={"Node Js"} img={node}></Tooltip>
            <Tooltip label={"JavaScript"} img={js}></Tooltip>

            <Tooltip label={"Spring Java"} img={spring}></Tooltip>
            <Tooltip label={"Java"} img={java}></Tooltip>
          </div>
          <div className="flex gap-5">
            <Tooltip label={"MySQL"} img={mysql}></Tooltip>
            <Tooltip label={"Google Cloud Platform"} img={gcp}></Tooltip>

            <Tooltip label={"Redis"} img={redis}></Tooltip>
            <Tooltip label={"Git"} img={git}></Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
}
interface TooltipProps {
  label: string;
  img: any;
}

const Tooltip: React.FC<TooltipProps> = ({ label, img }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="tooltip-container relative inline-block drop-shadow-sm">
      <Image
        src={img}
        alt="alt"
        height={100}
        className="lg:h-[126px] lg:w-[126px]"
      ></Image>

      <div className="tooltip absolute grid top-0 left-0  items-center h-full text-center w-full bg-opacity-80 bg-black text-white p-2 rounded-md">
        <span className="opacity-100">{label}</span>
      </div>
    </div>
  );
};
