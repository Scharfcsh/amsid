# AMSID

A secure, URL-safe, configurable unique ID generator based on Nano ID.

## Features

- **Secure**: Uses cryptographically secure random number generation
- **URL-safe**: Generated IDs are safe to use in URLs without encoding
- **Configurable**: Customizable alphabet and ID length
- **Complex IDs**: Support for structured IDs with public and secure components
- **TypeScript**: Full TypeScript support with type declarations
- **Fast**: Optimized for performance with internal buffer pooling

## Installation

```bash
npm install amsid
```

## Usage

### Basic Usage

```typescript
import { nanoid } from 'amsid';

// Generate a 21-character ID (default)
const id = nanoid();
// => "V1StGXR8_Z5jdHi6B-myT"

// Generate a custom length ID
const shortId = nanoid(10);
// => "IRFa-VaY2b"
```

### Complex IDs

Generate structured IDs with public and secure components:

```typescript
import { generateComplexId } from 'amsid';

// Basic complex ID
const complexId = generateComplexId();
// => { id: "IRFa-VaY2b.V1StGXR8_Z5jdHi6B-myTVKRuNLlZEn", publicId: "IRFa-VaY2b", secureId: "V1StGXR8_Z5jdHi6B-myTVKRuNLlZEn", prefix: "" }

// With prefix and custom lengths
const complexId = generateComplexId({
  prefix: 'user',
  publicLength: 8,
  secureLength: 24
});
// => { id: "user_IRFa-VaY.V1StGXR8_Z5jdHi6B-myT", publicId: "IRFa-VaY", secureId: "V1StGXR8_Z5jdHi6B-myT", prefix: "user_" }
```

### Custom Random Function

Create a custom ID generator with your own alphabet:

```typescript
import { customRandom, randomBytes } from 'amsid';

const customId = customRandom('abcdef', 10, randomBytes);
const id = customId();
// => "fbaefaadeb"
```

### Using Custom Alphabet

```typescript
import { URL_ALPHABET } from 'amsid';

console.log(URL_ALPHABET);
// => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
```

## API

### `nanoid(size?: number): string`

Generate a secure, URL-safe unique identifier.

- `size` - The number of characters in the generated ID (default: 21)
- Returns: A URL-safe string identifier

### `generateComplexId(options?: ComplexIdOptions): ComplexIdResult`

Generate a structured ID with public and secure components.

#### ComplexIdOptions
- `prefix?` - Optional prefix for the ID
- `publicLength?` - Length of the public component (default: 12)
- `secureLength?` - Length of the secure component (default: 32)

#### ComplexIdResult
- `id` - The complete ID string
- `prefix` - The prefix used (with underscore if applicable)
- `publicId` - The public component
- `secureId` - The secure component

### `customRandom(alphabet: string, defaultSize: number, randomBytes: RandomFunction): CustomRandomFunction`

Create a custom ID generator with specified alphabet and size.

- `alphabet` - The alphabet to use for generation
- `defaultSize` - The default size for generated IDs
- `randomBytes` - Function to generate random bytes
- Returns: A function that generates IDs with the specified configuration

### `randomBytes(size: number): Uint8Array`

Generate random bytes using the secure random number generator.

- `size` - The number of bytes to generate
- Returns: A Uint8Array of random bytes

## Constants

### `URL_ALPHABET`

The default URL-safe alphabet containing uppercase letters, lowercase letters, digits, hyphen, and underscore (64 characters total).

### `ALPHABET_LEN`

The length of the URL_ALPHABET (64).

## TypeScript Support

This package includes full TypeScript type definitions. All functions and types are properly typed for the best development experience.

## Security

AMSID uses Node.js's `crypto.getRandomValues()` for secure random number generation. The generated IDs are cryptographically secure and suitable for use as session tokens, API keys, and other security-sensitive identifiers.

## License

MIT
