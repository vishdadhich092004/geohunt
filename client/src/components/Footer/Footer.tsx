import { Heart, Mail } from "lucide-react";
import { SlSocialGithub } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About GeoHunt</h3>
            <p className="text-sm text-gray-400">
              GeoHunt is a collaborative geography challenge where players
              explore random locations worldwide and test their geography skills
              using visual clues and intuition. Team up with friends or compete
              individually to dominate the leaderboard!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/how-to-play"
                  className="hover:text-primary transition-colors"
                >
                  How to Play
                </a>
              </li>
              <li>
                <a
                  href="/leaderboard"
                  className="hover:text-primary transition-colors"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Find Me </h3>
            <div className="space-y-4">
              {/* Contact Card */}
              <div className="bg-card/30 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
                <p className="text-sm text-gray-400 mb-3">
                  Have an idea or found a bug? I'd love to hear from you!
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    target="_blank"
                    href="https://github.com/vishdadhich092004/geohunt"
                    className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-md hover:bg-primary/10 transition-colors group"
                  >
                    <SlSocialGithub className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    <span className="text-sm text-gray-400 group-hover:text-primary">
                      GitHub
                    </span>
                  </a>
                  <a
                    target="_blank"
                    href="https://twitter.com/emVishesh"
                    className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-md hover:bg-primary/10 transition-colors group"
                  >
                    <RiTwitterXLine className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    <span className="text-sm text-gray-400 group-hover:text-primary">
                      Twitter
                    </span>
                  </a>
                  <a
                    target="_blank"
                    href="mailto:vishdadhich20@gmail.com"
                    className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-md hover:bg-primary/10 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    <span className="text-sm text-gray-400 group-hover:text-primary">
                      Email
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Made in India */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Made in India */}
            <p className="flex items-center gap-2 text-gray-400">
              Made in India with{" "}
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />{" "}
              by <span className="font-bold text-primary">Vishesh</span>
            </p>

            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} GeoHunt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
