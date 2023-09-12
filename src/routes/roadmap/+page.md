# Roadmap and Library architecture

## Architecture

This library currently makes use of [Svelte's `setContext`/`getContext` API](https://learn.svelte.dev/tutorial/context-api) to provide a Molstar plugin state for the subcomponents.

More sophisticated design (like component factories / programmaic components) could be considered later, when the architecture and the feature scope of the library will be more clear.

**NB:** Molstar-wise, we actually [use the PluginContext without the builtin React-UI](https://molstar.org/docs/plugin/#plugincontext-without-built-in-react-ui).

## Roadmap
- [x] ~~create a simple wrapper component~~
- [ ] put it in action in this doc and other projects, refine the API and styling (wrapper) concerns (outside plugin)
- [ ] create a set of controls components (button-bar, debug ui, etc.), refine styling concerns (outside plugin)
- [ ] refine the API around representation and coloring (in plugin)
- [ ] explore a dedicated synchronized grid component
- [ ] explore a dedicated superposition component

## References / resources

### Documentation and examples

Official Molstar doc: https://molstar.org/docs/.

Overall Molstar architecture: https://diglib.eg.org/bitstream/handle/10.2312/molva20181103/029-033.pdf?sequence=1&isAllowed=y

Molstar issues: https://github.com/molstar/molstar/issues

Molstar discussions (great topics!): https://github.com/molstar/molstar/discussions

### Topics

taking screenshots:  
https://github.com/molstar/molstar/discussions/362

changing mouse behavior:  
https://github.com/molstar/molstar/discussions/465


displaying several structures/grid:  
https://github.com/molstar/molstar/discussions/475

Display/load a specific chain:  
https://github.com/molstar/molstar/discussions/909