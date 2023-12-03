# codev

codev is a small social media website built with [Bun](https://bun.sh) and [HTMX](https://htmx.org).

The framework being used is [Elysia](https://elysiajs.com) and the ORM is [drizzle](https://orm.drizzle.team)

To install dependencies:

```bash
bun install
```

To run:

```bash
bunx postcss src/styles.css -o src/routes/home

bun run dev
```

Environment Variables:

```
DATABASE_URL=
REDIS_URL=
REDIS_PORT=
REDIS_HOST=
JWT_SECRET=
BUCKET_NAME=
BUCKET_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACESS_KEY=
```

This project was created using `bun init` in bun v0.8.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
