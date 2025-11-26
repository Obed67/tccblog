/**
 * Calculate estimated reading time for an article
 * @param content - HTML content of the article
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Formatted reading time string
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, "");

  // Count words
  const words = text.trim().split(/\s+/).length;

  // Calculate minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes < 1) {
    return "Moins d'1 min";
  } else if (minutes === 1) {
    return "1 min de lecture";
  } else {
    return `${minutes} min de lecture`;
  }
}

/**
 * Get word count from HTML content
 */
export function getWordCount(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  return text.trim().split(/\s+/).length;
}

/**
 * Calculate reading progress percentage
 */
export function calculateReadingProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollableHeight = scrollHeight - clientHeight;
  if (scrollableHeight <= 0) return 0;
  
  const progress = (scrollTop / scrollableHeight) * 100;
  return Math.min(Math.max(progress, 0), 100);
}
