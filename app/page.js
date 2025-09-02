import Link from 'next/link';
import { BookOpen, PlusCircle } from 'lucide-react'; // Using lucide-react for icons

export default function HomePage() {
  return (
    <div className="text-center">
      <div className="bg-white p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Welcome to the School Directory
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Your one-stop platform to easily find and add school information.
          Navigate using the options below to get started.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/show-schools"
            className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-cyan-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen className="w-6 h-6 group-hover:animate-pulse" />
            <span>View All Schools</span>
          </Link>

          <Link
            href="/add-school"
            className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-cyan-600 text-lg font-semibold rounded-lg border border-cyan-200 shadow-md hover:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            <PlusCircle className="w-6 h-6 group-hover:animate-pulse" />
            <span>Add a New School</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
