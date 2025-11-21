import { take } from "./pool.js";
import { URL_ALPHABET } from "./alphabet.js";

export type RandomFunction = (size: number) => Uint8Array;
export type CustomRandomFunction = (size?: number) => string;

/**
 * Generate a secure, URL-safe unique identifier.
 * @param size The number of characters in the generated ID (default: 21)
 * @returns A URL-safe string identifier
 */
export function nanoid(size = 21): string {
  const bytes = take(size);
  let id = "";

  for (let i = 0; i < size; i++) {
    id += URL_ALPHABET[bytes[i] & 63];
  }

  return id;
}

/**
 * Generate a custom random ID generator with specified alphabet and size.
 * @param alphabet The alphabet to use for generation
 * @param defaultSize The default size for generated IDs
 * @param randomBytes Function to generate random bytes
 * @returns A function that generates IDs with the specified configuration
 */
export function customRandom(
  alphabet: string,
  defaultSize: number,
  randomBytes: RandomFunction
): CustomRandomFunction {
  const mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
  const step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);

  return (size = defaultSize): string => {
    if (!size) return "";

    let id = "";

    while (true) {
      const bytes = randomBytes(step);
      let i = step;

      while (i--) {
        id += alphabet[bytes[i] & mask] || "";

        if (id.length >= size) return id;
      }
    }
  };
}

/**
 * Generate random bytes using the secure random number generator.
 * @param size The number of bytes to generate
 * @returns A Uint8Array of random bytes
 */
export function randomBytes(size: number): Uint8Array {
  return take(size);
}
