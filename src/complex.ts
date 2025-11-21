import { nanoid } from "./core/random.js";

export interface ComplexIdOptions {
  prefix?: string;
  publicLength?: number;
  secureLength?: number;
}

export interface ComplexIdResult {
  id: string;
  prefix: string;
  publicId: string;
  secureId: string;
}

export function generateComplexId(options?: ComplexIdOptions): ComplexIdResult {
  const prefix = options?.prefix ? `${options.prefix}_` : "";

  const publicId = nanoid(options?.publicLength ?? 12);
  const secureId = nanoid(options?.secureLength ?? 32);

  return {
    id: `${prefix}${publicId}.${secureId}`,
    prefix,
    publicId,
    secureId,
  };
}

