import type { Metadata } from "next";
import { Inter, Courier_Prime, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const courier = Courier_Prime({ weight: "400", subsets: ["latin"], variable: '--font-courier' });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"], variable: '--font-merriweather' });

export const metadata = {
  title: "The Editor",
  description: "Procedural Investigation Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${courier.variable} ${merriweather.variable}`}>{children}</body>
    </html>
  );
}
