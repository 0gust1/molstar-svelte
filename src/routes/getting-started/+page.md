# Getting started

## Installation

```bash
npm install molstar-svelte
```
(Molstar is declared as a peer dependency of the package, on modern package managers it will be installed automatically).

## Usage 

### In a Sveltekit application

As an in-browser and WEBGL-heavy toolkit, Molstar doesn't play well with SSR (Sever Side Rendering) and some flavors of SSG (Static Site Generation), so you'll need some extra work to run it smoothly in a Sveltekit application.

For now, it's recommended to:
- Create your own component in which you will compose the Molstar components (entry component / composition root).
- Dynamically import this component in your page (using `<svelte:component>`).

**Component example:**
```svelte
<!-- your component -->
<script lang="ts">
import {SimpleWrapper, StructureURL} from 'molstar-svelte';
export let url = 'https://alphafold.ebi.ac.uk/files/AF-P05067-F1-model_v4.cif';
export let structureType = 'mmcif';

</script>

<SimpleWrapper class="h-96">
 <svelte:fragment slot="elements">
  <!-- here you can inject/compose "html-less" components that will render on the Molstar's plugin canvas -->
   <StructureURL url={url} type={structureType} />
 </svelte:fragment>
 <svelte:fragment slot="controls">
  <!-- here you can inject/compose "html" components that will render outside of the Molstar's plugin canvas -->
  <!-- Useful for UI elements, buttons, etc. -->
  <p>Currently displaying {url}</p>
 </svelte:fragment>
</SimpleWrapper>
```

**Component usage example:**
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

### In a Svelte application

The previous method should work, but you should also be able to use the components directly in your Svelte application (without the need for a dynamic import).


## Styling

**TODO**

TLDR; : use a contract-based approach, with BEM-named classes, allowing to easily override the default styling.