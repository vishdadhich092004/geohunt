import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-100 mb-8">
        Oops! It seems like you're trying to find your partner, but they don't
        exist... just like this page!
      </p>
      <Link to="/" className="px-6 py-3  text-white rounded-lg bg-green-700 ">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
