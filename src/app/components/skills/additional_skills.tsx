export default function AdditionalSkills(props: any) {
  const colors = [
    "#D2FF72", // lime/yellow
    "#72FFAA", // mint green
    "#7BDFFF", // sky blue
    "#FFD772", // warm yellow
  ];

  function getColoredSkill(skill: string): JSX.Element {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <span
        style={{
          backgroundColor: randomColor,
          color: "black",

          borderRadius: "9999px",
          fontWeight: "500",
          display: "inline-block",
        }}
        className="px-4 py-2 hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {skill}
      </span>
    );
  }

  return (
    <section className="h-auto w-[85vw] m-auto text-3xl flex flex-col text-center gap-[20px] tracking-tight">
      <div className="text-4xl text-center font-medium">Additional Skills</div>
      <span className="text-base text-gray-400 italic">
        Jack of all trades master of none, <br />
        though oftentimes better than master of one
      </span>

      <div className="hidden md:flex gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("Figma")}
        {getColoredSkill("TypeScript")}
        {getColoredSkill("React")}
        {getColoredSkill("Vue.js")}
        {getColoredSkill("GSAP")}
        {getColoredSkill("Jest")}
      </div>
      <div className="hidden md:flex gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("UI Design")}
        {getColoredSkill("UX Design")}
        {getColoredSkill("Storybook")}
        {getColoredSkill("System Design")}
      </div>
      <div className=" hidden md:flex gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("C++")}
        {getColoredSkill("Data Science")}
        {getColoredSkill("Machine Learning")}
        {getColoredSkill("Natural Language Processing")}
      </div>

      {/* MOBILE VIEW */}
      <div className="flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("Figma")}
        {getColoredSkill("TypeScript")}
        {getColoredSkill("React")}
      </div>

      <div className="flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("Vue.js")}
        {getColoredSkill("GSAP")}
        {getColoredSkill("Jest")}
      </div>

      <div className="flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("UI Design")}
        {getColoredSkill("UX Design")}
      </div>
      <div className="flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("Storybook")}
        {getColoredSkill("System Design")}
      </div>
      <div className=" flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("C++")}
        {getColoredSkill("Data Science")}
      </div>
      <div className=" flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("Machine Learning")}
      </div>
      <div className=" flex md:hidden gap-[20px] items-center justify-center text-xl">
        {getColoredSkill("Natural Language Processing")}
      </div>
    </section>
  );
}
