import type { Metadata } from "next";
import { Figtree, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto-sans" });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Meridian Physiotherapy — Movement, restored",
  description:
    "One-on-one physiotherapy for pain relief, injury recovery, and getting back to full movement. Book an appointment online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", figtree.variable, notoSans.variable, playfairDisplay.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pt-24 md:pt-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
