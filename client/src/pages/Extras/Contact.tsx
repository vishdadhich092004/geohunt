import { Mail } from "lucide-react";

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-300px)] mt-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact the Developer</h1>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <p className="text-lg mb-6">
            Have questions, suggestions, or found a bug? I'd love to hear from
            you! Feel free to reach out through any of the following channels:
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a
                  href="mailto:vishdadhich20@gmail.com"
                  className="text-primary hover:underline"
                >
                  vishdadhich20@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Social Media</h3>
              <p>
                You can also find me on{" "}
                <a
                  href="https://twitter.com/emVishesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Twitter
                </a>{" "}
                or{" "}
                <a
                  href="https://github.com/vishdadhich092004/geohunt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
