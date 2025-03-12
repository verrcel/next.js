import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes with clsx classes conditionally.
 * @param inputs - An array of class values to merge.
 * @returns Merged class names as a string.
 * @example
 * cn("text-red-500", "text-sm");
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Concatenates the full path by appending a given path to the base URL. Provided from the environment variable.
 * @param path - The path to append, e.g. "api/order".
 * @returns The full path.
 */
export const getFullPath = (path: string): string => {
  // If the path starts with a slash, remove it to avoid duplication.
  if (path.startsWith("/")) path = path.slice(1);
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`;
};
