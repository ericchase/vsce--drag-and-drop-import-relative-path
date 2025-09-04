## About

The `Drag And Drop Import Relative Path` VSCode extension is great! However, it's a bit restrictive. I removed all the notifications about unsupported drag-n-drop types, and changed the code to return `undefined` so that VSCode can apply default behavior.

- https://github.com/ElecTreeFrying/drag-import-relative-path
- https://marketplace.visualstudio.com/items?itemName=ElecTreeFrying.drag-import-relative-path

Please check the `Releases` page on GitHub to find built `.vsix` files. These files can be dragged directly into VSCode's Extensions sidebar panel to install them.

Please check the `src/CHANGELOG.md` file for more information about changes.

Another fork to make note of:

- https://github.com/xianghongai/drag-drop-import.git

## Build Tools V4

For information about my TypeScript library and Build Tools, please visit:

- https://github.com/ericchase-library/ts-library
- https://github.com/ericchase-library/ts-templates-vscode-extension

## Setup & Usage

Setup and use the project as usual:

```bash
bun install
bun run build # full build
bun run dev # dev mode
```
