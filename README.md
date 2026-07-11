# Syllogos — Website

Marketing site for **Syllogos**, a desktop research companion for AI-powered,
human-led research assessment.

Built with the **"Instrument + Dossier"** design identity: an editorial
display serif (Fraunces) fused with measurement-precision mono numerals
(Geist Mono), over a warm gold-on-navy palette and a 3D logo-constellation
hero. The centerpiece is an interactive **CRAF instrument** — a radial dial
of the 10 Comprehensive Research Assessment Framework dimensions.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) · React 19
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + Three.js for the WebGL hero

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Deploying to Vercel

This is a standard Next.js app and deploys to [Vercel](https://vercel.com)
with **zero configuration** — import the repository and Vercel auto-detects
the framework, runs `next build`, and serves it.

### Environment variables (optional)

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Absolute base URL for SEO/Open Graph metadata (e.g. `https://syllogos.app`). |

If unset, the site falls back to the per-deployment `VERCEL_URL`, so social
link previews work out of the box on `*.vercel.app`. Set `NEXT_PUBLIC_SITE_URL`
once a custom domain is attached.

Node version is pinned to 22 via `.nvmrc` / `package.json#engines`.
