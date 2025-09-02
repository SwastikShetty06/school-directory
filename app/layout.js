import { Inter } from "next/font/google";
import Link from 'next/link';
import { School, Github, FileText } from 'lucide-react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Directory",
  description: "A simple directory to browse and add schools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-cyan-600 hover:text-cyan-400">
                School Directory
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/show-schools" className="text-gray-600 hover:text-cyan-600 transition-colors">
                  View Schools
                </Link>
                <Link href="/add-school" className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-500 transition-colors shadow">
                  Add School
                </Link>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
         <footer className="bg-white border-t mt-auto">
          <div className="container mx-auto px-6 py-6 text-center text-gray-600">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
               <p>By Swastik Shetty</p>
               <div className="flex items-center justify-center space-x-6">
                  <a href="https://github.com/SwastikShetty06" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href="https://github.com/SwastikShetty06/portfolio/blob/main/public/swastikshettyresume.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <FileText className="h-6 w-6" />
                    <span className="sr-only">Resume</span>
                  </a>
               </div>
            </div>
          </div>
        </footer>
        </div>
      </body>
    </html>
  );
}
