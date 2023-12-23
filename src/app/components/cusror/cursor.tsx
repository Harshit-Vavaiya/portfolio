"use client";
import React, { useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const links = document.querySelectorAll("a");
    const spans = document.querySelectorAll("span");
    const texts = document.querySelectorAll(".text");

    const onMouseMove = (event: { clientX: any; clientY: any }) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY });
    };

    const onMouseEnterLink = (event: any) => {
      gsap.to(cursor, { scale: 3 });
    };
    const onMouseLeaveLink = (event: any) => {
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
  });
  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text">View</span>
    </div>
  );
}
