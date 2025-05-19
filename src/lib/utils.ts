import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to ensure image paths are handled consistently
 * This helps with displaying images locally during development
 */
export function getImagePath(path: string): string {
  // If the path already starts with http or https, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // In development, we might need to adjust the path
  if (process.env.NEXT_PUBLIC_DEVELOPMENT === 'true') {
    // Return the path as is, since we've configured Next.js to handle local images
    return normalizedPath;
  }

  return normalizedPath;
}
