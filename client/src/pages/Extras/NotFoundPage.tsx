import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* Robot pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="robot-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="8" y="4" width="4" height="4" fill="currentColor" />
            <rect x="4" y="8" width="12" height="8" fill="currentColor" />
            <circle cx="10" cy="10" r="2" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#robot-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 px-4 text-center">
        <h1 className="text-8xl font-bold text-white mb-4 glitch-text">404</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-lg">
          Oops! It seems like you're trying to find your partner, but they don't
          exist... just like this page!
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-white rounded-lg bg-primary hover:bg-primary/80 transition-colors duration-300 shadow-lg shadow-primary/20"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
