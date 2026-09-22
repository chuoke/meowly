# Branding

Custom brand assets belong in `public/brand/`. Keep the base name unchanged when replacing an asset; use any supported image extension. Files in this directory override the codebase defaults.

| Base name | Purpose |
| --- | --- |
| `public/brand/icon.*` | Browser and app icon |
| `public/brand/icon-192.*` | 192×192 PWA icon |
| `public/brand/icon-512.*` | 512×512 PWA icon |
| `public/brand/apple-icon.*` | Apple home-screen icon |
| `public/brand/opengraph-image.*` | Open Graph sharing image |
| `public/brand/twitter-image.*` | Twitter sharing image |

When a custom asset is absent, the project uses its original icon files. The PWA manifest discovers the custom icons at build time. The Service Worker does not cache brand assets.
