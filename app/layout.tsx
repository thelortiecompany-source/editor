import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Site Plan - 161 S Delaware Drive",
  description: "Retail development site plan for Apache Junction, AZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
}
