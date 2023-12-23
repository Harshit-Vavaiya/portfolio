import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Cursor from "./components/cusror/cursor";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshit Vavaiya ",
  description: "HV's personal website!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Cursor></Cursor>
      <head>
        {/*         <base href="{{https://harshit-vavaiya.github.io/}}" /> */}
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
