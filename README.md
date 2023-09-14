# Molstar Svelte Library

This is a collection of [Svelte](https://svelte.dev) components for [Mol\*](https://molstar.org) visualizations.

The goal is to provide a set of composable components that can be used to build web applications/components/websites providing visualization and analysis of biomolecular structures.  
The components are designed to be used in a [Svelte](https://svelte.dev) application, ~~but could be used in any framework that supports [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)~~ (later).

![example event parameter](https://github.com/0gust1/molstar-svelte/actions/workflows/build.yml/badge.svg?event=push) ![example event parameter](https://github.com/0gust1/molstar-svelte/actions/workflows/deploy.yml/badge.svg?event=push) ![example event parameter](https://github.com/0gust1/molstar-svelte/actions/workflows/publish.yml/badge.svg?event=release)

## Documentation / showcase

[https://0gust1.github.io/molstar-svelte/](https://0gust1.github.io/molstar-svelte/)

## Development

Install the dependencies...

```bash
# we use npm ci to install the pinned dependencies from package-lock.json
npm ci 
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` is used to generate the documentation/showcase/e2e website.

## Building

To build the library:

```bash
npm run package
```

To create a production version of the documentation/showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Updating the documentation/showcase

Website/doc deployment is done through github actions, on push on `master` 

## Publishing

Publishing is done through github actions, on release creation on `master`.
