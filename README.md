# Portfolio App

Next.js portfolio with locale routing, contact API, hardened CSP, and Docker dev/prod setup.

## Env Files

Tracked templates:

- `.env.example`: shared reference
- `.env.dev`: Docker/local development template
- `.env.prod`: production template

Local-only file:

- `.env`: fill this only on your laptop with real secrets

Important:

- Do not put real secrets into tracked env files
- Rotate any SMTP or Netlify secret that was ever committed before this change
- Never expose server secrets with `NEXT_PUBLIC_*`

## Local Run

```bash
pnpm install
pnpm dev
```

## Docker

Development:

```bash
pnpm docker:dev
```

Production:

```bash
pnpm docker:prod
```

Direct compose commands:

```bash
docker compose -f docker-compose.dev.yml up --build
docker compose -f docker-compose.prod.yml up --build -d
```

## Security Notes

- Production image uses Next.js standalone output
- Container runtime runs as non-root
- Production compose enables `no-new-privileges`
- `.dockerignore` excludes `.env*` from build context
- Contact API reads secrets only on the server through `src/lib/server-env.ts`
- Contact API returns only generic operational errors, not secret/config values

## Netlify Deploy

The deploy script now prefers `.env.prod` and falls back to `.env`.

```bash
pnpm prod
```
