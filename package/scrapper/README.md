# Scraper Scripts Tool

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

### Storage

```bash
docker run -p 9000:9000 -p 9001:9001 --name minio1 -e "MINIO_ROOT_USER=ROOTUSER" -e "MINIO_ROOT_PASSWORD=CHANGEME123" minio/minio server /data --console-address ":9001"
```

###### This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.