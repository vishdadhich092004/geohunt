import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import wiseqr from "@/media/wiseqr.png";
function Premium() {
  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <div className="absolute top-4 left-4 mt-20">
        <BackButton />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl font-bold text-center text-primary">
          Currently, No Premium
        </h1>
        <p className="text-2xl text-center text-foreground/80">
          Thanks to Google Maps , this is free!
        </p>

        <span className="flex items-center gap-2">
          <img src={wiseqr} alt="Wise QR" className="w-60 h-60" />
          <Link
            className="text-lg text-center bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2 rounded-lg shadow-lg transition-colors"
            to="https://wise.com/pay/business/visheshdadhich"
            target="_blank"
          >
            Pay Me via Wise
          </Link>
        </span>
      </div>
    </div>
  );
}
export default Premium;
