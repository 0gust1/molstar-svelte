# Molstar Svelte Library

This is a collection of [Svelte](https://svelte.dev) components for [Mol\*](https://molstar.org) visualizations.

The goal is to provide a set of composable components that can be used to build web applications/components/websites providing visualization and analysis of biomolecular structures.  
The components are designed to be used in a [Svelte](https://svelte.dev) application, ~~but could be used in any framework that supports [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)~~ (later).

## Developing

Install the dependencies...

```bash
# we use npm ci to install the pinned dependencies from package-lock.json
npm ci 
```


```bash
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

## Publishing

Website/doc deploymen is done through github actions. 

**TODO:**  
package publishing is not yet automated.

```bash
npm publish
```
