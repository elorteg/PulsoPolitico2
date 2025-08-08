# v0 Next.js Starter for Vercel

This is a minimal starter setup for deploying a v0-generated Next.js app on Vercel.

## Setup instructions

1. Delete your existing `node_modules` and lockfiles (if any):
```
rm -rf node_modules
rm pnpm-lock.yaml package-lock.json yarn.lock
```

2. Install dependencies with pnpm or npm:
```
pnpm install
# or
npm install
```

3. Run your dev server locally:
```
pnpm run dev
# or
npm run dev
```

4. Commit and push your code to the repo connected to Vercel.

5. Deploy on Vercel — it should build without errors.

## Notes

- The `jsconfig.json` defines the `@/*` alias used by v0.
- The `package.json` pins React, Next.js, and UI dependencies compatible with v0.
- This setup assumes your source files are under `src/` folder.
- Add your own components under `src/components/ui/` or `src/app/` as needed.
