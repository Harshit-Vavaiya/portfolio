import Image from "next/image";
import logo from "/public/images/logo.png";
import Link from "next/link";

export default function Navbar(props: any) {
  return (
    <nav className="p-5 md:p-10  flex items-center">
      <div className="flex items-center gap-5 flex-1">
        <Image src={logo} alt={"Logo"} height={60} priority></Image>
        <div className="hidden md:block text-4xl font-extrabold text-[#3d3d3d]">
          /
        </div>
        <div className="hidden md:block text-3xl font-bold">
          Harshit Vavaiya
        </div>
      </div>
      <Link
        href={"#contact"}
        className="hidden md:grid w-[160px]
h-[60px] items-center text-center text-md border-[1px] rounded-xl self-end hover:border-[#C8346B]"
      >
        Get in touch
      </Link>
    </nav>
  );
}
