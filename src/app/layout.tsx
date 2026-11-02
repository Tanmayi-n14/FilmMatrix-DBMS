import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProjectBanner from "@/components/ProjectBanner";

export const metadata: Metadata = {
  title: "FilmMatrix | PES University DBMS Level 3",
  description: "Global Movie Catalog & Production Analytics Engine using MySQL and Neo4j Graph NoSQL by Tanmayi Nagabhairava & Varsha A Patil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className="min-h-screen flex flex-col antialiased selection:bg-amber-600 selection:text-white transition-colors"
        style={{
          backgroundColor: 'var(--bg-page)',
          color: 'var(--text-main)'
        }}
      >
        <ProjectBanner />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer 
          className="border-t py-4 text-center text-xs transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-muted)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-medium" style={{ color: 'var(--text-main)' }}>
              FilmMatrix — PES University CSE • DBMS Mini-Project (Section I)
            </p>
            <p className="font-mono text-[11px] opacity-80">
              Tanmayi Nagabhairava (PES1UG24CS493) &amp; Varsha A Patil (PES1UG24CS516)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
