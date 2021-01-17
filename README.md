# lazer

Lazer is a utility for printing to the console using a fluent API. Written in TypeScript and compatible with Deno and Node.js runtimes.

## Description
Lazer helps you build, format and print complex messages to the console using an expressive fluent API.

## Usage

### Simple Example

```typescript
import { lazer } from "https://deno.land/x/lazer/mod.ts"

lazer()
    .print("Hello,")
    .print_space()
    .print_green("World")
    .print_ln("!")
```

```bash
$ deno run example.ts
"Hello, World!"

```

### Complex Example

## Supported Platforms

### Deno