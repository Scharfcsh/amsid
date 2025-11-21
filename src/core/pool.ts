import { webcrypto as crypto } from "node:crypto";

const POOL_SIZE_MULTIPLIER = 128;

let pool: Buffer | undefined;
let poolOffset = 0;

function refill(bytes: number) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.getRandomValues(pool);
    poolOffset = 0;
  }

  poolOffset += bytes;
}

export function take(bytes: number): Buffer {
  refill(bytes);
  return pool!.subarray(poolOffset - bytes, poolOffset);
}
