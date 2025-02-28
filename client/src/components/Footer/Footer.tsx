import { Heart, Mail, ExternalLink, Globe, MapPin } from "lucide-react";
import { SlSocialGithub } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-16 bg-gradient-to-t from-background to-background/95 backdrop-blur-sm border-t border-white/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] opacity-50" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      <div className="container mx-auto px-4 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <Globe className="h-8 w-8 text-primary transition-transform group-hover:rotate-45 duration-500" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                GeoHunt
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              GeoHunt is a collaborative geography challenge where players
              explore random locations worldwide and test their geography skills
              using visual clues and intuition.
            </p>
            <Button
              variant="outline"
              className="border-primary/20 hover:border-primary/50 hover:bg-primary/10 text-primary/80 hover:text-primary transition-all"
              onClick={() =>
                window.open(
                  "https://github.com/vishdadhich092004/geohunt",
                  "_blank"
                )
              }
            >
              <SlSocialGithub className="mr-2 h-4 w-4" />
              Star on GitHub
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary/50 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/how-to-play"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  How to Play
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/premium"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Premium Features
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary/50 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary/50 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              {/* Contact Card */}
              <div className="bg-white/5 p-5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <h4 className="font-medium text-white">Find Me</h4>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">
                    Have an idea or found a bug? I'd love to hear from you!
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      target="_blank"
                      href="https://github.com/vishdadhich092004/geohunt"
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md hover:bg-primary/10 transition-colors group/link"
                    >
                      <SlSocialGithub className="w-4 h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
                      <span className="text-sm text-gray-400 group-hover/link:text-primary transition-colors">
                        GitHub
                      </span>
                    </a>
                    <a
                      target="_blank"
                      href="https://twitter.com/emVishesh"
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md hover:bg-primary/10 transition-colors group/link"
                    >
                      <RiTwitterXLine className="w-4 h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
                      <span className="text-sm text-gray-400 group-hover/link:text-primary transition-colors">
                        Twitter
                      </span>
                    </a>
                    <a
                      target="_blank"
                      href="mailto:vishdadhich20@gmail.com"
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md hover:bg-primary/10 transition-colors group/link"
                    >
                      <Mail className="w-4 h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
                      <span className="text-sm text-gray-400 group-hover/link:text-primary transition-colors">
                        Email
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover/link:text-primary transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Made in India */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Made in India */}
            <p className="flex items-center gap-2 text-gray-400">
              Made in India with{" "}
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />{" "}
              by{" "}
              <a
                href="https://twitter.com/emVishesh"
                target="_blank"
                className="font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Vishesh
              </a>
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
