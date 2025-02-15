import { Link } from "react-router-dom";

function Premium() {
  return (
    <div className="min-h-screen flex flex-col space-y-5 items-center justify-center bg-background">
      <h1 className="text-6xl font-bold text-center">Never, No Premium</h1>
      <p className="text-2xl text-center">
        We are not a premium service. We are a free service.
      </p>

      <Link
        className="text-lg text-center bg-green-600 px-3 py-2 rounded-lg shadow-2xl hover:bg-green-700 transition-colors"
        to="/"
      >
        Home Page
      </Link>

      <a
        className="text-lg text-center bg-blue-600 px-3 py-2 rounded-lg shadow-2xl hover:bg-blue-700 transition-colors"
        href="https://paypal.me/vishdadhich"
        target="_blank"
        rel="noopener noreferrer"
      >
        Donate via PayPal
      </a>
    </div>
  );
}
export default Premium;
