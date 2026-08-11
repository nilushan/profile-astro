# Firebase deployment

The production site uses Firebase Hosting for prerendered pages and a Cloud Function for Astro's `/api/**` routes.

## Architecture

```text
Browser
├── page and asset requests → Firebase Hosting (`dist/client`)
└── /api/**                → `api` Cloud Function
                                └── Astro middleware handler (`functions/dist/server/entry.mjs`)
```

Current configuration:

- Firebase project: `nilushandevelopment`
- Hosting site/target: `nilushansilva`
- Function: `api`
- Function region: `australia-southeast1` (Sydney)
- Runtime: Node.js 22
- Production branch: `master`

The implementation is defined by `astro.config.mjs`, `firebase.json`, `functions/index.js`, and the workflows in `.github/workflows/`.

## Required secrets

### Gemini runtime secret

Set the chatbot key through Firebase Secret Manager:

```bash
firebase functions:secrets:set GEMINI_API_KEY --project nilushandevelopment
```

`functions/index.js` declares this secret and exposes it only to the running function. Never place the key in source files or documentation.

### GitHub Actions secrets

The repository workflows expect:

- `FIREBASE_SERVICE_ACCOUNT_NILUSHANDEVELOPMENT` for Hosting deployments
- `FIREBASE_TOKEN` for the production Functions deployment action

Add them under **GitHub repository → Settings → Secrets and variables → Actions**. Treat `FIREBASE_TOKEN` as a legacy CI credential: rotate it when exposed and prefer a short-lived/service-account-based replacement when the Functions deployment action supports one.

## Automated deployment

### Production

`.github/workflows/firebase-hosting-merge.yml` runs on pushes to `master`:

1. Installs pnpm and Node.js 22.
2. Runs `pnpm install --frozen-lockfile`.
3. Runs `pnpm build`.
4. Copies `dist` to `functions/dist`.
5. Runs `npm ci` in `functions/`.
6. Deploys the live Hosting channel.
7. Deploys Cloud Functions.

### Pull requests

`.github/workflows/firebase-hosting-pull-request.yml` validates internal pull requests and deploys a Hosting preview. It does **not** deploy Functions. Firebase preview channels are intentionally served with `noindex` headers.

## Manual deployment

Install and authenticate the Firebase CLI, then run:

```bash
pnpm install
pnpm build
rm -rf functions/dist && cp -R dist functions/dist
npm ci --prefix functions
firebase deploy --project nilushandevelopment
```

Deploy only one service when appropriate:

```bash
firebase deploy --only hosting --project nilushandevelopment
firebase deploy --only functions --project nilushandevelopment
```

Do not omit the copy step before a Functions deployment: the wrapper imports `functions/dist/server/entry.mjs`.

## Local verification

```bash
pnpm build
pnpm preview
```

For Firebase integration testing:

```bash
rm -rf functions/dist && cp -R dist functions/dist
firebase emulators:start --project nilushandevelopment
```

Verify the production API and indexing header after deployment:

```bash
curl -i https://www.nilushansilva.info/api/chat
curl -I https://www.nilushansilva.info/ | grep -i x-robots-tag
```

A GET request to `/api/chat` need not succeed because the route implements POST; it should still reach the deployed application rather than return a Hosting rewrite error.

## Region configuration

The function region is set in `functions/index.js`:

```js
onRequest({ region: 'australia-southeast1', secrets: [geminiApiKey] }, handler)
```

Sydney is the preferred location for the site's Australian audience. Changing a deployed region creates a new regional function and may require explicitly deleting the old function; review Firebase's migration guidance before changing it.

## Troubleshooting

### `GEMINI_API_KEY not configured`

Confirm the secret exists and redeploy Functions:

```bash
firebase functions:secrets:access GEMINI_API_KEY --project nilushandevelopment
firebase deploy --only functions --project nilushandevelopment
```

### `Failed to load Astro server`

Rebuild and copy `dist` into `functions/dist` before deployment.

### Hosting works but the API does not

Check that:

- `firebase.json` rewrites `/api/**` to `api`.
- The function deployed in `australia-southeast1`.
- The Functions build contains `functions/dist/server/entry.mjs`.
- Firebase Functions logs contain no startup error.

```bash
firebase functions:log --project nilushandevelopment
```

### Production shows `noindex`

Confirm that the tested URL is the live site or custom domain, not a preview URL containing `--`. See [SEO and indexing](../operations/seo.md).
