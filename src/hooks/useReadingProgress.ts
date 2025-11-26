import { useState, useEffect } from "react";
import { calculateReadingProgress } from "../utils/readingTime";

interface ReadingProgressState {
  progress: number;
  isReading: boolean;
}

export function useReadingProgress(): ReadingProgressState {
  const [progress, setProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const currentProgress = calculateReadingProgress(
        scrollTop,
        scrollHeight,
        clientHeight
      );

      setProgress(currentProgress);
      setIsReading(currentProgress > 0 && currentProgress < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { progress, isReading };
}
