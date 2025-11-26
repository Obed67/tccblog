import { Article } from "../lib/supabase";

/**
 * Simple fuzzy search implementation
 */
export function fuzzySearch(text: string, query: string): boolean {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  let queryIndex = 0;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex === queryLower.length;
}

/**
 * Search articles by query
 */
export function searchArticles(articles: Article[], query: string): Article[] {
  if (!query.trim()) return articles;
  
  const queryLower = query.toLowerCase();
  
  return articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(queryLower);
    const summaryMatch = article.summary.toLowerCase().includes(queryLower);
    const contentMatch = article.content.toLowerCase().includes(queryLower);
    const categoryMatch = article.category.toLowerCase().includes(queryLower);
    const authorMatch = article.author.name.toLowerCase().includes(queryLower);
    
    return titleMatch || summaryMatch || contentMatch || categoryMatch || authorMatch;
  });
}

/**
 * Highlight search terms in text
 */
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600">$1</mark>');
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, limit: number = 5): string[] {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, "");
  
  // Split into words and filter
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 4); // Only words longer than 4 chars
  
  // Count frequency
  const frequency: Record<string, number> = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top N
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Calculate relevance score for search results
 */
export function calculateRelevanceScore(article: Article, query: string): number {
  const queryLower = query.toLowerCase();
  let score = 0;
  
  // Title match (highest weight)
  if (article.title.toLowerCase().includes(queryLower)) {
    score += 10;
  }
  
  // Summary match
  if (article.summary.toLowerCase().includes(queryLower)) {
    score += 5;
  }
  
  // Category match
  if (article.category.toLowerCase().includes(queryLower)) {
    score += 3;
  }
  
  // Author match
  if (article.author.name.toLowerCase().includes(queryLower)) {
    score += 2;
  }
  
  // Content match (lowest weight)
  if (article.content.toLowerCase().includes(queryLower)) {
    score += 1;
  }
  
  return score;
}

/**
 * Sort articles by relevance
 */
export function sortByRelevance(articles: Article[], query: string): Article[] {
  return articles
    .map((article) => ({
      article,
      score: calculateRelevanceScore(article, query),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article);
}
