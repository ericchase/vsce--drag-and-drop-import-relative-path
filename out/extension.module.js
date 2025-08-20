'use strict';

var vscode4 = require('vscode');
var path2 = require('path');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var vscode4__namespace = /*#__PURE__*/ _interopNamespaceDefault(vscode4);
var path2__namespace = /*#__PURE__*/ _interopNamespaceDefault(path2);

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => (all[name] = () => newValue),
    });
};

// src/original-repo/src/providers/selector.ts
var selectors = [
  {
    language: 'javascript',
    scheme: 'file',
  },
  {
    language: 'javascriptreact',
    scheme: 'file',
  },
  {
    language: 'typescript',
    scheme: 'file',
  },
  {
    language: 'typescriptreact',
    scheme: 'file',
  },
  {
    language: 'css',
    scheme: 'file',
  },
  {
    language: 'scss',
    scheme: 'file',
  },
  {
    language: 'html',
    scheme: 'file',
  },
  {
    language: 'markdown',
    scheme: 'file',
  },
];
function getFileExt(relativePath) {
  return path2__namespace.parse(relativePath).ext;
}
// src/original-repo/src/utilities/import-type.ts
function getImportType(relativePath) {
  switch (getFileExt(relativePath)) {
    case '.js':
      return 'script';
    case '.css':
      return 'stylesheet';
    case '.scss':
      return null;
    case '.md':
      return 'markdown';
    default:
      return 'image';
  }
}
function notify(type) {
  switch (type) {
    case 0 /* SameFilePath */: {
      vscode4__namespace.window.showWarningMessage(`Same file path.`);
      return { insertText: undefined };
    }
    case 1 /* NotSupported */: {
      vscode4__namespace.window.showWarningMessage(`Not supported.`);
      return { insertText: undefined };
    }
  }
}
function getRelativePath(from, to) {
  const startChars = isSameDir(from, to) ? './' : '';
  const relativePath = toWindowsPath(relative2(from, to));
  return startChars + removeFileExt(relativePath);
}
function relative2(from, to) {
  return path2__namespace.relative(path2__namespace.dirname(from), to);
}
function toWindowsPath(relativePath) {
  return relativePath.replace(/\\/gi, '/');
}
function removeFileExt(relativePath) {
  const ext = getFileExt(relativePath);
  return relativePath.slice(0, -ext.length);
}
function isSameDir(from, to) {
  from = path2__namespace.parse(from).dir.toLowerCase().trim();
  to = path2__namespace.parse(from).dir.toLowerCase().trim();
  return from === to || from.includes(to);
}
// src/original-repo/src/import-snippets/javascript.ts
var exports_javascript = {};
__export(exports_javascript, {
  snippet: () => snippet,
});

// src/original-repo/src/import-statements/html-markdown.ts
var exports_html_markdown = {};
__export(exports_html_markdown, {
  markdownImportStatement: () => markdownImportStatement,
  markdownImageImportStatement: () => markdownImageImportStatement,
  htmlStylesheetImportStatement: () => htmlStylesheetImportStatement,
  htmlScriptImportStatement: () => htmlScriptImportStatement,
  htmlImageImportStatement: () => htmlImageImportStatement,
});
// src/original-repo/src/providers/supported-file-extensions.ts
var supportedImages = ['.gif', '.jpeg', '.jpg', '.png', '.webp'];
var htmlSupported = ['.js', '.css', ...supportedImages];
var markdownSupported = ['.md', ...supportedImages];
var cssSupported = ['.css', ...supportedImages];
var scssSupported = ['.scss', '.css', ...supportedImages];
var permittedExts = ['.html', '.md', '.css', '.scss', '.tsx', '.jsx'];
// src/original-repo/src/providers/import-configuration.ts
var exports_import_configuration = {};
__export(exports_import_configuration, {
  typescript: () => typescript,
  scssImage: () => scssImage,
  scss: () => scss,
  markdownImage: () => markdownImage,
  markdown: () => markdown,
  javascript: () => javascript,
  cssImage: () => cssImage,
  css: () => css,
  HTMLStylesheet: () => HTMLStylesheet,
  HTMLScript: () => HTMLScript,
  HTMLImage: () => HTMLImage,
});
var javascript = [
  { value: 0, description: "import name from '_relativePath_';" },
  { value: 1, description: "import { name } from '_relativePath_';" },
  { value: 2, description: "import { default as name } from '_relativePath_';" },
  { value: 3, description: "import * as name from '_relativePath_';" },
  { value: 4, description: "import '_relativePath_';" },
  { value: 5, description: "var name = require('_relativePath_');" },
  { value: 6, description: "const name = require('_relativePath_');" },
  { value: 7, description: "var name = import('_relativePath_');" },
  { value: 8, description: "const name = import('_relativePath_');" },
];
var typescript = [
  { value: 0, description: "import name from '_relativePath_';" },
  { value: 1, description: "import { name } from '_relativePath_';" },
  { value: 2, description: "import { default as name } from '_relativePath_';" },
  { value: 3, description: "import * as name from '_relativePath_';" },
  { value: 4, description: "import '_relativePath_';" },
];
var css = [
  { value: 0, description: "@import '_relativePath_';" },
  { value: 1, description: "@import url('_relativePath_');" },
];
var cssImage = [{ value: 0, description: "url('_relativePath_')" }];
var scss = [
  { value: 0, description: "@import '_relativePath_';" },
  { value: 1, description: "@import url('_relativePath_');" },
  { value: 2, description: "@use '_relativePath_';" },
  { value: 3, description: "@use '_relativePath_' as *;" },
];
var scssImage = [{ value: 0, description: "url('_relativePath_')" }];
var HTMLScript = [{ value: 0, description: '<script type="text/javascript" src="_relativePath_"></script>' }];
var HTMLImage = [{ value: 0, description: '<img src="_relativePath_" alt="sample">' }];
var HTMLStylesheet = [{ value: 0, description: '<link href="_relativePath_" rel="stylesheet">' }];
var markdown = [{ value: 0, description: '![text](_relativePath_)' }];
var markdownImage = [
  { value: 0, description: '![alt-text](_relativePath_ "Hover text")' },
  { value: 1, description: '![alt-text][image] / [image]: _relativePath_ "Hover text"' },
];
// src/original-repo/src/import-statements/html-markdown.ts
function htmlScriptImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('htmlScriptImportStyle');
  configValue = exports_import_configuration.HTMLScript.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`<script type="text/javascript" src="${relativePath}"></script>`);
    default:
      return new vscode4__namespace.SnippetString(`<script type="text/javascript" src="${relativePath}"></script>`);
  }
}
function htmlImageImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('htmlImageImportStyle');
  configValue = exports_import_configuration.HTMLImage.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`<img src="${relativePath}" alt="sample">`);
    default:
      return new vscode4__namespace.SnippetString(`<img src="${relativePath}" alt="sample">`);
  }
}
function htmlStylesheetImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('htmlStyleSheetImportStyle');
  configValue = exports_import_configuration.HTMLStylesheet.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`<link href="${relativePath}" rel="stylesheet">`);
    default:
      return new vscode4__namespace.SnippetString(`<link href="${relativePath}" rel="stylesheet">`);
  }
}
function markdownImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('markdownImportStyle');
  configValue = exports_import_configuration.markdown.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`![text](${relativePath})`);
    default:
      return new vscode4__namespace.SnippetString(`![text](${relativePath})`);
  }
}
function markdownImageImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('markdownImageImportStyle');
  configValue = exports_import_configuration.markdownImage.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`![alt-text](${relativePath} "Hover text")`);
    case 1:
      return new vscode4__namespace.SnippetString(`![alt-text][image] / [image]: ${relativePath} "Hover text"`);
    default:
      return new vscode4__namespace.SnippetString(`![alt-text](${relativePath} "Hover text")`);
  }
}

// src/original-repo/src/import-statements/css-scss.ts
var exports_css_scss = {};
__export(exports_css_scss, {
  scssImportStatement: () => scssImportStatement,
  scssImageImportStatement: () => scssImageImportStatement,
  cssImportStatement: () => cssImportStatement,
  cssImageImportStatement: () => cssImageImportStatement,
});
function cssImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('cssImportStyle');
  configValue = exports_import_configuration.css.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`@import '${relativePath}';`);
    case 1:
      return new vscode4__namespace.SnippetString(`@import url('${relativePath}');`);
    default:
      return new vscode4__namespace.SnippetString(`@import '${relativePath}';`);
  }
}
function cssImageImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('cssImageImportStyle');
  configValue = exports_import_configuration.cssImage.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`url('${relativePath}')`);
    default:
      return new vscode4__namespace.SnippetString(`url('${relativePath}')`);
  }
}
function scssImportStatement(relativePath) {
  relativePath = parsePartialFile(relativePath);
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('scssImportStyle');
  configValue = exports_import_configuration.scss.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`@import '${relativePath}';`);
    case 1:
      return new vscode4__namespace.SnippetString(`@import url('${relativePath}');`);
    case 2:
      return new vscode4__namespace.SnippetString(`@use '${relativePath}';`);
    case 3:
      return new vscode4__namespace.SnippetString(`@use '${relativePath}'; as $1`);
    default:
      return new vscode4__namespace.SnippetString(`@import '${relativePath}';`);
  }
}
function scssImageImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('scssImageImportStyle');
  configValue = exports_import_configuration.scssImage.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`url('${relativePath}')`);
    default:
      return new vscode4__namespace.SnippetString(`url('${relativePath}')`);
  }
}
function parsePartialFile(relativePath) {
  const arr = relativePath.split('/');
  const lastElemIndex = arr.length - 1;
  arr[lastElemIndex].startsWith('_') && (arr[lastElemIndex] = arr[lastElemIndex].substring(1));
  return arr.join('/');
}

// src/original-repo/src/import-statements/javascript-typescript.ts
var exports_javascript_typescript = {};
__export(exports_javascript_typescript, {
  typescriptImportStatement: () => typescriptImportStatement,
  javascriptImportStatement: () => javascriptImportStatement,
});
function javascriptImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('javascriptImportStyle');
  configValue = exports_import_configuration.javascript.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`import $1 from '${relativePath}';`);
    case 1:
      return new vscode4__namespace.SnippetString(`import { $1 } from '${relativePath}';`);
    case 2:
      return new vscode4__namespace.SnippetString(`import { $1 as $2 } from '${relativePath}';`);
    case 3:
      return new vscode4__namespace.SnippetString(`import * as $1 from '${relativePath}';`);
    case 4:
      return new vscode4__namespace.SnippetString(`import '${relativePath}';`);
    case 5:
      return new vscode4__namespace.SnippetString(`var $1 = require('${relativePath}');`);
    case 6:
      return new vscode4__namespace.SnippetString(`const $1 = require('${relativePath}');`);
    case 7:
      return new vscode4__namespace.SnippetString(`var $1 = import('${relativePath}');`);
    case 8:
      return new vscode4__namespace.SnippetString(`const $1 = import('${relativePath}');`);
    default:
      return new vscode4__namespace.SnippetString(`import $1 from '${relativePath}';`);
  }
}
function typescriptImportStatement(relativePath) {
  let configValue = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('typescriptImportStyle');
  configValue = exports_import_configuration.typescript.find((config) => config.description === configValue).value;
  switch (configValue) {
    case 0:
      return new vscode4__namespace.SnippetString(`import $1 from '${relativePath}';`);
    case 1:
      return new vscode4__namespace.SnippetString(`import { ${importName(relativePath)} } from '${relativePath}';`);
    case 2:
      return new vscode4__namespace.SnippetString(`import { $1 as $2 } from '${relativePath}';`);
    case 3:
      return new vscode4__namespace.SnippetString(`import * as $1 from '${relativePath}';`);
    case 4:
      return new vscode4__namespace.SnippetString(`import '${relativePath}';`);
    default:
      return new vscode4__namespace.SnippetString(`import { $1 } from '${relativePath}';`);
  }
}
function importName(relativePath) {
  if (relativePath.includes('.component') || relativePath.includes('.directive') || relativePath.includes('.pipe')) {
    const snackCase = path2__namespace.basename(relativePath).replace(/\./g, '-');
    return snackCase
      .split('-')
      .map((e) => e[0].toUpperCase() + e.slice(1))
      .join('');
  } else {
    return '$1';
  }
}

// src/original-repo/src/import-statements/index.ts
var importStatement = {
  ...exports_html_markdown,
  ...exports_css_scss,
  ...exports_javascript_typescript,
};

// src/original-repo/src/import-snippets/javascript.ts
function snippet(relativePath, fromFilepath) {
  const preserve = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('preserveScriptFileExtension');
  const fileType = preserve ? getFileExt(fromFilepath) : '';
  return importStatement.javascriptImportStatement(relativePath + fileType);
}
// src/original-repo/src/import-snippets/jsx.ts
var exports_jsx = {};
__export(exports_jsx, {
  snippet: () => snippet2,
});
function snippet2(relativePath, fromFilepath) {
  switch (getFileExt(fromFilepath)) {
    case '.gif':
    case '.jpeg':
    case '.jpg':
    case '.png':
    case '.webp':
    case '.json':
    case '.js':
    case '.jsx':
    case '.html':
    case '.yml':
    case '.yaml':
    case '.md': {
      return new vscode4__namespace.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
    }
    case '.woff':
    case '.woff2':
    case '.ttf':
    case '.eot':
    case '.css':
    case '.scss': {
      return new vscode4__namespace.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
    }
    default: {
      return new vscode4__namespace.SnippetString(``);
    }
  }
}
// src/original-repo/src/import-snippets/typescript.ts
var exports_typescript = {};
__export(exports_typescript, {
  snippet: () => snippet3,
});
function snippet3(relativePath, fromFilepath) {
  const preserve = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('preserveScriptFileExtension');
  let fileType = preserve ? getFileExt(fromFilepath) : '';
  return importStatement.typescriptImportStatement(relativePath + fileType);
}
// src/original-repo/src/import-snippets/tsx.ts
var exports_tsx = {};
__export(exports_tsx, {
  snippet: () => snippet4,
});
function snippet4(relativePath, fromFilepath) {
  switch (getFileExt(fromFilepath)) {
    case '.gif':
    case '.jpeg':
    case '.jpg':
    case '.png':
    case '.webp':
    case '.json':
    case '.ts':
    case '.js':
    case '.tsx':
    case '.html':
    case '.yml':
    case '.yaml':
    case '.md': {
      return new vscode4__namespace.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
    }
    case '.woff':
    case '.woff2':
    case '.ttf':
    case '.eot':
    case '.css':
    case '.scss': {
      return new vscode4__namespace.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
    }
    default: {
      return new vscode4__namespace.SnippetString(``);
    }
  }
}
// src/original-repo/src/import-snippets/css.ts
var exports_css = {};
__export(exports_css, {
  snippet: () => snippet5,
});
function snippet5(relativePath, fromFilepath) {
  switch (getImportType(fromFilepath)) {
    case 'image':
      return importStatement.cssImageImportStatement(relativePath + getFileExt(fromFilepath));
    default:
      return importStatement.cssImportStatement(relativePath + getFileExt(fromFilepath));
  }
}
// src/original-repo/src/import-snippets/scss.ts
var exports_scss = {};
__export(exports_scss, {
  snippet: () => snippet6,
});
function snippet6(relativePath, fromFilepath) {
  switch (getImportType(fromFilepath)) {
    case 'image':
      return importStatement.cssImageImportStatement(relativePath + getFileExt(fromFilepath));
    default:
      return importStatement.scssImportStatement(relativePath + getScssFileExt(fromFilepath));
  }
}
function getScssFileExt(fromFilepath) {
  if (getFileExt(fromFilepath) === '.css') {
    return getFileExt(fromFilepath);
  } else {
    const preserve = vscode4__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('preserveStylesheetFileExtension');
    return preserve ? getFileExt(fromFilepath) : '';
  }
}
// src/original-repo/src/import-snippets/html.ts
var exports_html = {};
__export(exports_html, {
  snippet: () => snippet7,
});
function snippet7(relativePath, fromFilepath) {
  switch (getImportType(fromFilepath)) {
    case 'script':
      return importStatement.htmlScriptImportStatement(relativePath + getFileExt(fromFilepath));
    case 'image':
      return importStatement.htmlImageImportStatement(relativePath + getFileExt(fromFilepath));
    case 'stylesheet':
      return importStatement.htmlStylesheetImportStatement(relativePath + getFileExt(fromFilepath));
  }
}
// src/original-repo/src/import-snippets/markdown.ts
var exports_markdown = {};
__export(exports_markdown, {
  snippet: () => snippet8,
});
function snippet8(relativePath, fromFilepath) {
  switch (getImportType(fromFilepath)) {
    case 'markdown':
      return importStatement.markdownImportStatement(relativePath + getFileExt(fromFilepath));
    case 'image':
      return importStatement.markdownImageImportStatement(relativePath + getFileExt(fromFilepath));
  }
}
// src/original-repo/src/utilities/import-statement-snippet.ts
function importStatementSnippet(relativePath, fromFilepath, toFilepath) {
  switch (getFileExt(toFilepath)) {
    case '.js': {
      return exports_javascript.snippet(relativePath, fromFilepath);
    }
    case '.jsx': {
      return exports_jsx.snippet(relativePath, fromFilepath);
    }
    case '.ts': {
      return exports_typescript.snippet(relativePath, fromFilepath);
    }
    case '.tsx': {
      return exports_tsx.snippet(relativePath, fromFilepath);
    }
    case '.css': {
      return exports_css.snippet(relativePath, fromFilepath);
    }
    case '.scss': {
      return exports_scss.snippet(relativePath, fromFilepath);
    }
    case '.html': {
      return exports_html.snippet(relativePath, fromFilepath);
    }
    case '.md': {
      return exports_markdown.snippet(relativePath, fromFilepath);
    }
  }
}
// src/original-repo/src/subscriptions/auto-import-on-drop-provider.ts
class AutoImportOnDropProvider {
  async provideDocumentDropEdits(_document, position, dataTransfer, token) {
    const dataTransferItem = dataTransfer.get('text/plain');
    const dropFilePath = _document.uri.fsPath;
    const dragFilePath = dataTransferItem.value;
    if (dragFilePath.toLowerCase() === dropFilePath.toLowerCase()) {
      return notify(0 /* SameFilePath */);
    }
    if ((!permittedExts.includes(getFileExt(dropFilePath)) && getFileExt(dragFilePath) !== getFileExt(dropFilePath)) || (getFileExt(dragFilePath) === '.html' && getFileExt(dropFilePath) === '.html') || (!htmlSupported.includes(getFileExt(dragFilePath)) && getFileExt(dropFilePath) === '.html') || (!markdownSupported.includes(getFileExt(dragFilePath)) && getFileExt(dropFilePath) === '.md') || (!cssSupported.includes(getFileExt(dragFilePath)) && getFileExt(dropFilePath) === '.css') || (!scssSupported.includes(getFileExt(dragFilePath)) && getFileExt(dropFilePath) === '.scss')) {
      notify(1 /* NotSupported */);
      return { insertText: relativePath(dropFilePath, dragFilePath) };
    }
    const snippet9 = importStatementSnippet(getRelativePath(dropFilePath, dragFilePath), dragFilePath, dropFilePath);
    if (
      snippet9.value ===
      `
`
    ) {
      notify(1 /* NotSupported */);
      return { insertText: relativePath(dropFilePath, dragFilePath) };
    }
    return { insertText: snippet9 };
  }
}
function relativePath(toFilepath, fromFilepath) {
  const snippet9 = new vscode4__namespace.SnippetString(`${getRelativePath(toFilepath, fromFilepath) + getFileExt(fromFilepath)}`);
  return snippet9.appendText(`
`);
}

// src/extension.module.ts
function activate(context) {
  context.subscriptions.push(vscode4__namespace.languages.registerDocumentDropEditProvider(selectors, new AutoImportOnDropProvider()));
}

exports.activate = activate;
