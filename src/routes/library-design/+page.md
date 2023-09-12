# Design and contributing

## Architecture

At the moment, this library make use of Svelte's context feature to provide a Molstar plugin state for the subcomponents.

The simplest example of this library usage would use 2 component: 
- a "wrapper" component 
- a "canvas" component nested in the wrapper

TODO: example + code snippet

More sophisticated design (like component factories) could be considered later, when the architecture and the feature scope of the library is more clear.

**NB:** Molstar-wise, we actually [use the PluginContext without the builtin React-UI](https://molstar.org/docs/plugin/#plugincontext-without-built-in-react-ui).


## References / resources

### Documentation and examples

Official Molstar doc: https://molstar.org/docs/.

Overall Molstar architecture: https://diglib.eg.org/bitstream/handle/10.2312/molva20181103/029-033.pdf?sequence=1&isAllowed=y

### Topics

taking screenshots:

https://github.com/molstar/molstar/discussions/362

changing mouse behavior:

https://github.com/molstar/molstar/discussions/465


displaying several structures:
https://github.com/molstar/molstar/discussions/475