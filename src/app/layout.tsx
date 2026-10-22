import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProjectBanner from "@/components/ProjectBanner";

export const metadata: Metadata = {
  title: "FilmMatrix | PES University DBMS Level 3",
  description: "Global Movie Catalog & Production Analytics Engine using MySQL and Neo4j Graph DB by Tanmayi Nagabhairava & Varsha A Patil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 antialiased selection:bg-purple-600 selection:text-white">
        <ProjectBanner />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-gray-800/80 bg-[#060910] py-6 text-center text-xs text-gray-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              <strong>FilmMatrix</strong> — Polyglot DBMS Platform • PES University CSE
            </p>
            <p className="font-mono text-gray-400">
              Tanmayi Nagabhairava (PES1UG24CS493) & Varsha A Patil (PES1UG24CS516) • Section I
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
