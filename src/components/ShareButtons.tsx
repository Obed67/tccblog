import { Share2, Twitter, Facebook, Linkedin, Mail, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { copyToClipboard, shareContent } from "../utils/helpers";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    await shareContent({
      title,
      text: description || title,
      url,
    });
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || title + "\n\n" + url)}`,
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <span className="text-sm font-semibold text-primary dark:text-white">
        Partager :
      </span>
      
      <div className="flex flex-wrap items-center gap-2">
        {/* Native Share (mobile) */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            aria-label="Partager"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Partager</span>
          </button>
        )}

        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
          aria-label="Partager sur Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg transition-colors"
          aria-label="Partager sur Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#0A66C2] hover:bg-[#095196] text-white rounded-lg transition-colors"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Email */}
        <a
          href={shareLinks.email}
          className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          aria-label="Partager par email"
        >
          <Mail className="w-4 h-4" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            copied
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-label="Copier le lien"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Copié !</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Copier</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
