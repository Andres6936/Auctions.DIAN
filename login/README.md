# bun-react-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Stack Auth

```bash
docker run -d --env-file .env --name stackauth-server --add-host=host.docker.internal:host-gateway -p 8101:8101 -p 8102:8102 stackauth/server:latest
```