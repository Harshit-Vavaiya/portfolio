import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/logo.png";
import linkedin from "/public/images/linkedin.svg";
import instagram from "/public/images/instagram.svg";
import github from "/public/images/github.svg";

export default function Footer(props: any) {
  return (
    <footer className="h-[321px] lg:h-[300px] w-[85vw] text-sm border-t-[1px] border-t-[#3d3d3d]  m-auto flex relative flex-col  gap-[60px] tracking-tight justify-center">
      <div className="flex items-center  justify-evenly md:hidden">
        <div>
          <Image src={logo} alt="logo" height={85}></Image>
        </div>
        <div className="flex flex-col items-center justify-evenly h-[250px]">
          <div className="flex gap-[20px] text-center text-[#4d4d4d]">
            <div className="flex flex-col gap-[5px]">
              <div className="font-bold">Contact</div>
              <Link
                href="mailto:harshitvavaiya9@gmail.com"
                className="hover:text-white"
              >
                Email Me
              </Link>
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="font-bold">Resume</div>
              <Link href="#" className="hover:text-white">
                Download CV
              </Link>
            </div>
          </div>
          <div className="flex gap-[20px]">
            <Link href={"https://www.linkedin.com/in/harshitvavaiya/"}>
              <Image src={linkedin} alt="linkedin"></Image>
            </Link>
            <Link href={"https://github.com/Harshit-Vavaiya"}>
              <Image src={github} alt="github"></Image>
            </Link>
            <Link href={"https://www.instagram.com/harshitvavaiya/"}>
              <Image src={instagram} alt="instagram"></Image>
            </Link>
          </div>
        </div>
      </div>

      <div className=" hidden md:flex items-center  justify-evenly">
        <div className="flex gap-[20px] text-center text-[#4d4d4d] flex-1/3">
          <div className="flex flex-col gap-[5px]">
            <div className="font-bold">Contact</div>
            <Link
              href="mailto:harshitvavaiya9@gmail.com"
              className="hover:text-white"
            >
              Email Me
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="font-bold">Resume</div>
            <Link href="#" className="hover:text-white">
              Download CV
            </Link>
          </div>
        </div>
        <div className="flex-1/3">
          <Image src={logo} alt="logo" height={125}></Image>
        </div>
        <div className="flex gap-[20px] flex-1/3">
          <Link href={"https://www.linkedin.com/in/harshitvavaiya/"}>
            <Image src={linkedin} alt="linkedin"></Image>
          </Link>
          <Link href={"https://github.com/Harshit-Vavaiya"}>
            <Image src={github} alt="github"></Image>
          </Link>
          <Link href={"https://www.instagram.com/harshitvavaiya/"}>
            <Image src={instagram} alt="instagram"></Image>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-2 text-center w-[87vw] text-[#3d3d3d]">
        Copyright © 2022 Harshit Vavaiya
      </div>
    </footer>
  );
}
