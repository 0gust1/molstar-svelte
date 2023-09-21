# Molstar Svelte Library

*A collection of [Svelte](https://svelte.dev) components for [Mol\*](https://molstar.org)-based visualizations*


![build status badge](https://github.com/0gust1/molstar-svelte/actions/workflows/build.yml/badge.svg?event=push) ![deploy status badge](https://github.com/0gust1/molstar-svelte/actions/workflows/deploy.yml/badge.svg?event=push) ![publish status badge](https://github.com/0gust1/molstar-svelte/actions/workflows/publish.yml/badge.svg?event=release)

## Goals 
- **Provide a set of composable components** that can be used to build web applications, websites or components enabling visualization and analysis of biomolecular structures.
- **Provide a set of examples** of how to use the components in a Svelte application.
- **Keep the components as simple as possible**, and let the user decide how to use them.
- **The goal is not** to redo the Molstar Viewer in Svelte.
- **The goal is not** to provide a full set of components with extensive Molstar API coverage, but rather a set of building blocks (and examples/inspirations) that can be used to build a custom application.


The components are designed to be used in a [Svelte](https://svelte.dev) or [SvelteKit](https://kit.svelte.dev/) application. ~~They could be also be used in any framework that supports [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)~~ (later).

## Please Note!

**This package is still in early development, and the API is not stable.** Until it reaches version 1.0.0, breaking changes may be introduced in any versions.

**Pin your dependencies if you're bold enough to use it!** (and drop me a message, I'd really love to hear about it!).

## Usage, Getting Started, Documentation, Showcase

[https://0gust1.github.io/molstar-svelte/](https://0gust1.github.io/molstar-svelte/)

See the dedicated [Get started](https://0gust1.github.io/molstar-svelte/getting-started) page.

## Feedback, issues, contributions, questions

Feel free to initiate a discussion in the [Repository Discussions](https://github.com/0gust1/molstar-svelte/discussions) or [Repository Issues](https://github.com/0gust1/molstar-svelte/issues).

## Library Development

Install the dependencies...

```bash
# we use npm ci to install the pinned dependencies from package-lock.json
npm ci 
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` is used to generate the documentation/showcase/e2e website.

### Building

To build the library:

```bash
npm run package
```

To build the library and create a production version of the documentation/showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Updating the documentation/showcase website

Website/doc deployment is done through github actions, on push on `master` 

### Publishing on npmjs.com

Publishing is done through github actions, on release creation on `master`.

## Licensing and attributions

`molstar-svelte` is licensed under the [MIT License](https://opensource.org/license/mit/).

**Mol\*:**
> David Sehnal, Sebastian Bittrich, Mandar Deshpande, Radka Svobodová, Karel Berka, Václav Bazgier, Sameer Velankar, Stephen K Burley, Jaroslav Koča, Alexander S Rose:  
> [Mol* Viewer: modern web app for 3D visualization and analysis of large biomolecular structures, Nucleic Acids Research, 2021; 10.1093/nar/gkab31](https://academic.oup.com/nar/article/49/W1/W431/6270780).  
In memory of Jaroslav Koča. 