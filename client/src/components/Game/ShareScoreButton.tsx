import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareScoreButtonProps {
  score: number;
  gameModeName?: string;
}

const GAME_URL = "https://geohunt.vercel.app";

/**
 * Shares the player's score using the native Web Share API when available,
 * falling back to clipboard copy on unsupported browsers.
 */
export default function ShareScoreButton({
  score,
  gameModeName,
}: ShareScoreButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = gameModeName
    ? `🌍 I scored ${score.toLocaleString()} on GeoHunt (${gameModeName} mode)! Can you beat me? → ${GAME_URL}`
    : `🌍 I scored ${score.toLocaleString()} on GeoHunt! Can you beat me? → ${GAME_URL}`;

  const handleShare = async () => {
    // Prefer native share sheet (mobile-friendly)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "GeoHunt Score",
          text: shareText,
          url: GAME_URL,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Last resort: prompt with the text
      window.prompt("Copy your score to share:", shareText);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="w-full border-amber-500/40 hover:bg-amber-500/10 text-amber-400 hover:text-amber-300 transition-all duration-300"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2 text-emerald-400" />
          Copied to clipboard!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share Score
        </>
      )}
    </Button>
  );
}
