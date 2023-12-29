import Link from "next/link";

export const Contact: React.FC<any> = (props: any) => {
  return (
    <section
      id="contact"
      className="h-auto w-[85vw]  m-auto grid items-center tracking-tight text-center"
    >
      <div className="text-3xl leading-normal font-bold md:w-[80%] md:m-auto lg:text-4xl lg:leading-normal lg:w-[70%] text">
        If you would like to get in touch 😄{" "}
        <Link
          href={"mailto:harshitvavaiya9@gmail.com"}
          className="text-[#C8346B] underline hover:text-[#FFD772]"
        >
          email me
        </Link>
        . I would love to connect with you on{" "}
        <Link
          href={"https://www.linkedin.com/in/harshitvavaiya/"}
          className="text-[#34A4C8] underline hover:text-[#FFD772]"
        >
          LinkedIn
        </Link>{" "}
        or{" "}
        <Link
          href={"https://harshitvavaiya.medium.com/"}
          className="text-[#C83434] underline hover:text-[#FFD772]"
        >
          Medium
        </Link>
        .
      </div>
    </section>
  );
};
