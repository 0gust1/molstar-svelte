# Getting started

## Installation

```bash
npm install molstar-svelte
```
(Molstar is declared as a peer dependency of the package, on modern package managers it will be installed automatically).

## Usage 


### Component example:
```svelte
<!-- your component -->
<script lang="ts">
import {SimpleWrapper, StructureURL} from 'molstar-svelte';
export let url = 'https://alphafold.ebi.ac.uk/files/AF-P05067-F1-model_v4.cif';
export let structureType = 'mmcif';

</script>
<!-- you will have to give an height to the wrapper, it will be the initial height of the canvas -->
<SimpleWrapper class="h-96">
 <svelte:fragment slot="inside">
  <!-- here you can inject/compose components that will render in the same container of the Molstar's plugin canvas -->
   <StructureURL url={url} type={structureType} />
 </svelte:fragment>
 <svelte:fragment slot="outside">
  <!-- here you can inject/compose "html" components that will render the container of the Molstar's plugin canvas -->
  <p>Currently displaying {url}</p>
 </svelte:fragment>
</SimpleWrapper>
```

#### Slots

You'll get 2 slots: `inside` and `outside`. 

Each component you'll inject in these two slots:
- will be rendered in a different container (depending on the slot).
- will be able to get the Molstar plugin instance through Svelte's getContext(), like: `const plugin = getContext('molstar').getPlugin()`.

The `inside` slot is injected in the same container as the Molstar's plugin canvas, while the `outside` slot is injected outside of it (but still in the container of `SimpleWrapper`).

Typically, if you want to position a UI element on top of the canvas, you'll want to use the `inside` slot, while if you want to position a UI element outside of the canvas, you'll want to use the `outside` slot.

In the example above, we're using `<svelte:fragment>` to inject our components without an extra container/wrapping element, but you can use any element you want.

### Loading the component in a page

#### In a Sveltekit application

As an in-browser and WEBGL-heavy toolkit, Molstar doesn't play well with SSR (Sever Side Rendering) and some flavors of SSG (Static Site Generation), so you'll need some extra work to run it smoothly in a Sveltekit application.

For now, it's recommended to:
- Create your own component in which you will compose the Molstar components (entry component / composition root).
- Dynamically import this component in your page (using `<svelte:component>`).

```svelte
<script lang="ts">
 const import3DViz = async () =>
    import('./My3DComponent.svelte').then((module) => module.default);
</script>

{#await import3DViz()}
  <p>loading 3D viz...</p>
{:then MolstarViz}
  <svelte:component this={MolstarViz} url={'https://alphafold.ebi.ac.uk/files/AF-P05067-F1-model_v4.cif'} structureType={'mmcif'}/>
{:catch error}
  <p>ARRH, ERROR: {error}</p>
{/await}
```


#### In a Svelte application

The previous method should work, but you should also be able to use the components directly in your Svelte application (without the need for a dynamic import).


## Styling

**TODO**

TLDR; : use a contract-based approach, with BEM-named classes, allowing to easily override the default styling.