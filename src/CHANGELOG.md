### (2025-09-03) 2.0.0

- Upgrade build tools
- Remove the `extensionPack` property to stop automatically installing `Auto Import Relative Path`
  - I do not believe the original extension is necessary anymore
- Update extension name and settings keys
  - Believe it or not, I believe the original code did not make use of the settings this extension provides. It seems to have read settings from the linked `Auto Import Relative Path` extension
  - I decided to change both the internal name of the extension and its settings keys to make it very clear to new users that this fork is not just an update of the original
  - You will need to setup your settings once more when using this fork
- Add the `defer` attribute to inserted `<script>` tags in `.html` files
  - For those who want `type="module"` or immediate execution, just remove the `defer`

### (2025-08-20) 1.0.0

- Enabled drag-n-drop support for `.jsx`, `.ts`, and `.tsx` files into `.html` files
- Changed the code to let the provider cancel/abort instead of sending "Not supported." and "Same file path." notifications to user
- Simplified the code base a bit to make future edits easier

---
