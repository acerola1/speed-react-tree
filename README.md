## About
Quick and dirty implementation of a React tree component capable of handling huge number of tree-nodes.
Uses a lightweight virtualization package [react-window](https://github.com/bvaughn/react-window).
Tested with 100.000 node overal.

## Possible improvements

- The tree nodes are flattened to an array with a recursive function to be able to render only the visible nodes. This implementation basically duplicate the memory footprint.
- The recursive function can be refactored to iterative to prevent possible stack overflow with deep tree structures.

## Demo
https://codesandbox.io/s/a-quick-react-tree-component-based-on-react-window-93b09
