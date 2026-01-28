import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components";

export const metadata: Metadata = {
  title: "Climate Dashboard",
  description: "Weather and climate monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
