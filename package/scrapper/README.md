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

You can directly apply changes to your database using the drizzle-kit push command. This is a convenient method for
quickly testing new schema designs or modifications in a local development environment, allowing for rapid iterations
without the need to manage migration files:

```bash
bunx drizzle-kit push
```

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