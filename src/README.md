# Drag And Drop Import Relative Path Fork

The `Drag And Drop Import Relative Path` VSCode extension is great! However, it's a bit restrictive. I removed all the notifications about unsupported drag-n-drop types, and changed the code to return `undefined` so that VSCode can apply default behavior.

From what I can tell, this extension used the settings provided by the older `Auto Import Relative Path` extension, instead of the settings that it itself provides. In response, I decided to change both the internal name of this extension and its settings keys instead of adding additional logic to sync between the settings of both extensions.

You will need to setup your settings again after installing version 2.0.0 of this fork.

---
