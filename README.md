# GuardianConnector Shared Nuxt Resources Library

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Shared components (components, pages, assets, middleware and more) for GuardianConnector Nuxt.js applications.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add gc-shared-nuxt-resources
```

That's it! You can now use GuardianConnector Shared Nuxt Resources Library in your Nuxt app ✨

## How to use this module

Unlike many Nuxt modules, this repository does not use a `playground/` directory. Instead, this module should be used directly with a GuardianConnector Nuxt application.

For development purposes, utilize a symlink to this module in a Nuxt application to use your local code in runtime:

### 1. Prepare the module
Inside the `gc-shared-nuxt-resources` directory:

```bash
pnpm run dev:prepare
```

This generates type stubs and prepares the build artifacts.

### 2. Link the module globally

Still in `gc-shared-nuxt-resources`, run:

```bash
pnpm link --global
```

### 3. Link it in the Nuxt app

Now go to your Nuxt app (e.g., `gc-explorer`) and link the global module:

```bash
pnpm link gc-shared-nuxt-resources
```

### 4. Verify the Link

``bash
ls -l node_modules/gc-shared-nuxt-resources
```

You should see a symlink pointing to your local module directory.

> [!CAUTION]
>
> 💡 Avoid running `pnpm install` in your Nuxt app again afterward, or it may override the symlink with the npm version unless the versions match exactly.

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Create a (p)npm symlink
  pnpm run link
  
  # Run Prettier
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/gc-shared-resources/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/gc-shared-resources
[npm-downloads-src]: https://img.shields.io/npm/dm/gc-shared-resources.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/gc-shared-resources
[license-src]: https://img.shields.io/npm/l/gc-shared-resources.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/gc-shared-resources
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
