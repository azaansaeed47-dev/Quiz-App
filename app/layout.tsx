import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quiz-App | Interactive Quiz Application",
  description:
    "Challenge yourself with 10 web development questions, automatic scoring, and detailed answer reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
