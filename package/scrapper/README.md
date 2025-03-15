# Scrapper

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Database

Alternatively, you can generate migrations using the drizzle-kit generate command and then apply them using the
drizzle-kit migrate command:

Generate migrations:

```bash
bunx drizzle-kit generate 
```

Apply migrations:

```bash
bunx drizzle-kit migrate 
```