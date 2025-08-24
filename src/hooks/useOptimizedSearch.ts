import { useMemo } from 'react';
import { useDebounce } from './useDebounce';

interface SearchOptions {
  debounceMs?: number;
  minSearchLength?: number;
  maxResults?: number;
  caseSensitive?: boolean;
}

interface SearchableItem {
  id: string;
  [key: string]: any;
}

/**
 * Optimized search hook for large datasets
 * Features:
 * - Debounced search queries
 * - Configurable search options
 * - Performance optimizations for large lists
 * - Multiple field searching
 */
export function useOptimizedSearch<T extends SearchableItem>(
  items: T[],
  searchQuery: string,
  searchFields: (keyof T)[],
  options: SearchOptions = {}
) {
  const {
    debounceMs = 300,
    minSearchLength = 2,
    maxResults = 100,
    caseSensitive = false,
  } = options;

  const debouncedQuery = useDebounce(searchQuery, debounceMs);

  const searchResults = useMemo(() => {
    // Early returns for performance
    if (!debouncedQuery.trim() || debouncedQuery.length < minSearchLength) {
      return {
        results: items,
        hasMore: false,
        totalMatches: items.length,
        isSearchActive: false,
      };
    }

    const query = caseSensitive ? debouncedQuery.trim() : debouncedQuery.toLowerCase().trim();
    let matchCount = 0;
    const results: T[] = [];

    // Optimized search with early termination
    for (let i = 0; i < items.length && results.length < maxResults; i++) {
      const item = items[i];
      let hasMatch = false;

      // Check each search field
      for (const field of searchFields) {
        const fieldValue = String(item[field] || '');
        const searchValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
        
        if (searchValue.includes(query)) {
          hasMatch = true;
          break; // Found match, no need to check other fields
        }
      }

      if (hasMatch) {
        results.push(item);
        matchCount++;
      }
    }

    // Check if there are more results beyond the limit
    let hasMore = false;
    if (results.length === maxResults) {
      // Quick check for additional matches
      for (let i = results.length; i < Math.min(items.length, results.length + 10); i++) {
        const item = items[i];
        for (const field of searchFields) {
          const fieldValue = String(item[field] || '');
          const searchValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
          
          if (searchValue.includes(query)) {
            hasMore = true;
            break;
          }
        }
        if (hasMore) break;
      }
    }

    return {
      results,
      hasMore,
      totalMatches: matchCount,
      isSearchActive: true,
    };
  }, [items, debouncedQuery, searchFields, minSearchLength, maxResults, caseSensitive]);

  return {
    ...searchResults,
    searchQuery: debouncedQuery,
    isLoading: searchQuery !== debouncedQuery, // True when debouncing
  };
}
