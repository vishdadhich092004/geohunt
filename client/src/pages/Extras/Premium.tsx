import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
function Premium() {
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="absolute top-4 left-4 mt-20">
        <BackButton />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl font-bold text-center text-primary">
          Never, No Premium
        </h1>
        <p className="text-2xl text-center text-foreground/80">
          We are not a premium service. We are a free service.
        </p>

        <Link
          className="text-lg text-center bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2 rounded-lg shadow-lg transition-colors"
          to="/"
        >
          Home Page
        </Link>

        <a
          className="text-lg text-center bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-2 rounded-lg shadow-lg transition-colors"
          href="https://paypal.me/vishdadhich"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate via PayPal
        </a>
      </div>
    </div>
  );
}
export default Premium;
