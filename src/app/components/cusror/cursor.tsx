"use client";
import React, { useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const links = document.querySelectorAll("a");
    const spans = document.querySelectorAll("span");
    const texts = document.querySelectorAll(".text");
    const skills = document.querySelectorAll(".tooltip-container");

    const onMouseMove = (event: { clientX: any; clientY: any }) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY });
    };

    const onMouseEnterLink = (event: any) => {
      gsap.to(cursor, { scale: 4 });
    };
    const onMouseLeaveLink = (event: any) => {
      gsap.to(cursor, { scale: 1 });
    };
    const onMouseEnterSkill = (event: any) => {
      gsap.to(cursor, { scale: 5 });
    };
    const onMouseLeaveSkill = (event: any) => {
      gsap.to(cursor, { scale: 1 });
    };

    document.addEventListener("mousemove", onMouseMove);
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });
    spans.forEach((text) => {
      text.addEventListener("mouseenter", onMouseEnterLink);
      text.addEventListener("mouseleave", onMouseLeaveLink);
    });
    texts.forEach((text) => {
      text.addEventListener("mouseenter", onMouseEnterLink);
      text.addEventListener("mouseleave", onMouseLeaveLink);
    });
    skills.forEach((skill) => {
      skill.addEventListener("mouseenter", onMouseEnterSkill);
      skill.addEventListener("mouseleave", onMouseLeaveSkill);
    });
  });
  return (
    <div id="custom-cursor" className="custom-cursor none lg:flex z-10">
      <span className="cursor-text">View</span>
    </div>
  );
}
