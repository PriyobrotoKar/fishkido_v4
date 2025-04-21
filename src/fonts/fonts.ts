import localFont from "next/font/local";
import { Outfit } from "next/font/google";

export const clashDisplay = localFont({
  src: "./ClashDisplay-Variable.ttf",
  variable: "--font-clash-display",
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
