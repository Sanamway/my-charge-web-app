"use client";

import "./globals.css";
import { initializeParse } from "@parse/react-ssr";
export const metadata = {
  title: "Charge City",
  description: "Ev Charging Soln",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  initializeParse(
    "https://parseapi.back4app.com/",
    "dGKTCkBysVMYHkojAnM1l0siiHlB3OLQvdeUoOZs",
    "6eCYDpqgwGTARsCdLOgOPatycHxXkrjQG70XyVgB"
  );
  return (
    <html lang="en">
      <body className="flex justify-center  bg-main-background">
        <div className="min-h-screen full overflow-auto bg-white lg:w-2/3 sm:w-screen ">
          {children}
        </div>
      </body>
    </html>
  );
}
