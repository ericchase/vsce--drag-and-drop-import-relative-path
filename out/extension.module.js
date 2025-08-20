'use strict';

var vscode = require('vscode');
var path3 = require('path');

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

var vscode__namespace = /*#__PURE__*/ _interopNamespaceDefault(vscode);
var path3__namespace = /*#__PURE__*/ _interopNamespaceDefault(path3);

// src/extension.module.ts

// src/src/providers/selector.ts
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

// src/src/providers/supported-file-extensions.ts
var supportedImages = ['.gif', '.jpeg', '.jpg', '.png', '.webp'];
var htmlSupported = ['.js', '.jsx', '.ts', '.tsx', '.css', ...supportedImages];
var markdownSupported = ['.md', ...supportedImages];
var cssSupported = ['.css', ...supportedImages];
var scssSupported = ['.scss', '.css', ...supportedImages];
var permittedExts = ['.html', '.md', '.css', '.scss', '.tsx', '.jsx'];
function getFileExt(relativePath) {
  return path3__namespace.parse(relativePath).ext;
}

// src/src/utilities/import-type.ts
function getImportType(relativePath) {
  switch (getFileExt(relativePath)) {
    case '.js':
    case '.jsx':
    case '.ts':
    case '.tsx':
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

// src/src/utilities/import-statement-snippet.ts
function importStatementSnippet(relativePath, fromFilepath, toFilepath) {
  switch (getFileExt(toFilepath)) {
    case '.js': {
      return snippets.javascript.snippet(relativePath, fromFilepath);
    }
    case '.jsx': {
      return snippets.jsx.snippet(relativePath, fromFilepath);
    }
    case '.ts': {
      return snippets.typescript.snippet(relativePath, fromFilepath);
    }
    case '.tsx': {
      return snippets.tsx.snippet(relativePath, fromFilepath);
    }
    case '.css': {
      return snippets.css.snippet(relativePath, fromFilepath);
    }
    case '.scss': {
      return snippets.scss.snippet(relativePath, fromFilepath);
    }
    case '.html': {
      return snippets.html.snippet(relativePath, fromFilepath);
    }
    case '.md': {
      return snippets.markdown.snippet(relativePath, fromFilepath);
    }
  }
  throw new Error('Matched nothing.');
}
var providers;
((providers) => {
  providers.javascript = [
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
  providers.typescript = [
    { value: 0, description: "import name from '_relativePath_';" },
    { value: 1, description: "import { name } from '_relativePath_';" },
    { value: 2, description: "import { default as name } from '_relativePath_';" },
    { value: 3, description: "import * as name from '_relativePath_';" },
    { value: 4, description: "import '_relativePath_';" },
  ];
  providers.css = [
    { value: 0, description: "@import '_relativePath_';" },
    { value: 1, description: "@import url('_relativePath_');" },
  ];
  providers.cssImage = [{ value: 0, description: "url('_relativePath_')" }];
  providers.scss = [
    { value: 0, description: "@import '_relativePath_';" },
    { value: 1, description: "@import url('_relativePath_');" },
    { value: 2, description: "@use '_relativePath_';" },
    { value: 3, description: "@use '_relativePath_' as *;" },
  ];
  providers.scssImage = [{ value: 0, description: "url('_relativePath_')" }];
  providers.HTMLScript = [{ value: 0, description: '<script src="_relativePath_"></script>' }];
  providers.HTMLImage = [{ value: 0, description: '<img src="_relativePath_" alt="sample">' }];
  providers.HTMLStylesheet = [{ value: 0, description: '<link rel="stylesheet" href="_relativePath_">' }];
  providers.markdown = [{ value: 0, description: '![text](_relativePath_)' }];
  providers.markdownImage = [
    { value: 0, description: '![alt-text](_relativePath_ "Hover text")' },
    { value: 1, description: '![alt-text][image] / [image]: _relativePath_ "Hover text"' },
  ];
})((providers ||= {}));
var snippets;
((snippets) => {
  ((css) => {
    function snippet(relativePath, fromFilepath) {
      switch (getImportType(fromFilepath)) {
        case 'image':
          return statements.cssImageImportStatement(relativePath + getFileExt(fromFilepath));
        default:
          return statements.cssImportStatement(relativePath + getFileExt(fromFilepath));
      }
    }
    css.snippet = snippet;
  })((snippets.css ||= {}));
  ((html) => {
    function snippet(relativePath, fromFilepath) {
      switch (getImportType(fromFilepath)) {
        case 'script':
          return statements.htmlScriptImportStatement(relativePath + getFileExt(fromFilepath));
        case 'image':
          return statements.htmlImageImportStatement(relativePath + getFileExt(fromFilepath));
        case 'stylesheet':
          return statements.htmlStylesheetImportStatement(relativePath + getFileExt(fromFilepath));
      }
      throw new Error('Matched nothing.');
    }
    html.snippet = snippet;
  })((snippets.html ||= {}));
  ((javascript) => {
    function snippet(relativePath, fromFilepath) {
      const preserve = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('preserveScriptFileExtension');
      const fileType = preserve ? getFileExt(fromFilepath) : '';
      return statements.javascriptImportStatement(relativePath + fileType);
    }
    javascript.snippet = snippet;
  })((snippets.javascript ||= {}));
  ((jsx) => {
    function snippet(relativePath, fromFilepath) {
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
          return new vscode__namespace.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
        }
        case '.woff':
        case '.woff2':
        case '.ttf':
        case '.eot':
        case '.css':
        case '.scss': {
          return new vscode__namespace.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
        }
        default: {
          return new vscode__namespace.SnippetString(``);
        }
      }
    }
    jsx.snippet = snippet;
  })((snippets.jsx ||= {}));
  ((markdown) => {
    function snippet(relativePath, fromFilepath) {
      switch (getImportType(fromFilepath)) {
        case 'markdown':
          return statements.markdownImportStatement(relativePath + getFileExt(fromFilepath));
        case 'image':
          return statements.markdownImageImportStatement(relativePath + getFileExt(fromFilepath));
      }
      throw new Error('Matched nothing.');
    }
    markdown.snippet = snippet;
  })((snippets.markdown ||= {}));
  ((scss) => {
    function snippet(relativePath, fromFilepath) {
      switch (getImportType(fromFilepath)) {
        case 'image':
          return statements.cssImageImportStatement(relativePath + getFileExt(fromFilepath));
        default:
          return statements.scssImportStatement(relativePath + getScssFileExt(fromFilepath));
      }
    }
    scss.snippet = snippet;
    function getScssFileExt(fromFilepath) {
      if (getFileExt(fromFilepath) === '.css') {
        return getFileExt(fromFilepath);
      } else {
        const preserve = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('preserveStylesheetFileExtension');
        return preserve ? getFileExt(fromFilepath) : '';
      }
    }
  })((snippets.scss ||= {}));
  ((tsx) => {
    function snippet(relativePath, fromFilepath) {
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
          return new vscode__namespace.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
        }
        case '.woff':
        case '.woff2':
        case '.ttf':
        case '.eot':
        case '.css':
        case '.scss': {
          return new vscode__namespace.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
        }
        default: {
          return new vscode__namespace.SnippetString(``);
        }
      }
    }
    tsx.snippet = snippet;
  })((snippets.tsx ||= {}));
  ((typescript) => {
    function snippet(relativePath, fromFilepath) {
      const preserve = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('preserveScriptFileExtension');
      let fileType = preserve ? getFileExt(fromFilepath) : '';
      return statements.typescriptImportStatement(relativePath + fileType);
    }
    typescript.snippet = snippet;
  })((snippets.typescript ||= {}));
})((snippets ||= {}));
var statements;
((statements) => {
  function cssImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('cssImportStyle');
    configValue = providers.css.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`@import '${relativePath}';`);
      case 1:
        return new vscode__namespace.SnippetString(`@import url('${relativePath}');`);
      default:
        return new vscode__namespace.SnippetString(`@import '${relativePath}';`);
    }
  }
  statements.cssImportStatement = cssImportStatement;
  function cssImageImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('cssImageImportStyle');
    configValue = providers.cssImage.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`url('${relativePath}')`);
      default:
        return new vscode__namespace.SnippetString(`url('${relativePath}')`);
    }
  }
  statements.cssImageImportStatement = cssImageImportStatement;
  function scssImportStatement(relativePath) {
    relativePath = parsePartialFile(relativePath);
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('scssImportStyle');
    configValue = providers.scss.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`@import '${relativePath}';`);
      case 1:
        return new vscode__namespace.SnippetString(`@import url('${relativePath}');`);
      case 2:
        return new vscode__namespace.SnippetString(`@use '${relativePath}';`);
      case 3:
        return new vscode__namespace.SnippetString(`@use '${relativePath}'; as $1`);
      default:
        return new vscode__namespace.SnippetString(`@import '${relativePath}';`);
    }
  }
  statements.scssImportStatement = scssImportStatement;
  function parsePartialFile(relativePath) {
    const arr = relativePath.split('/');
    const lastElemIndex = arr.length - 1;
    arr[lastElemIndex].startsWith('_') && (arr[lastElemIndex] = arr[lastElemIndex].substring(1));
    return arr.join('/');
  }
  function scssImageImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.styleSheet').get('scssImageImportStyle');
    configValue = providers.scssImage.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`url('${relativePath}')`);
      default:
        return new vscode__namespace.SnippetString(`url('${relativePath}')`);
    }
  }
  statements.scssImageImportStatement = scssImageImportStatement;
  function htmlScriptImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('htmlScriptImportStyle');
    configValue = providers.HTMLScript.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`<script src="${relativePath}"></script>`);
      default:
        return new vscode__namespace.SnippetString(`<script src="${relativePath}"></script>`);
    }
  }
  statements.htmlScriptImportStatement = htmlScriptImportStatement;
  function htmlImageImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('htmlImageImportStyle');
    configValue = providers.HTMLImage.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`<img src="${relativePath}" alt="sample">`);
      default:
        return new vscode__namespace.SnippetString(`<img src="${relativePath}" alt="sample">`);
    }
  }
  statements.htmlImageImportStatement = htmlImageImportStatement;
  function htmlStylesheetImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('htmlStyleSheetImportStyle');
    configValue = providers.HTMLStylesheet.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`<link rel="stylesheet" href="${relativePath}">`);
      default:
        return new vscode__namespace.SnippetString(`<link rel="stylesheet" href="${relativePath}">`);
    }
  }
  statements.htmlStylesheetImportStatement = htmlStylesheetImportStatement;
  function markdownImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('markdownImportStyle');
    configValue = providers.markdown.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`![text](${relativePath})`);
      default:
        return new vscode__namespace.SnippetString(`![text](${relativePath})`);
    }
  }
  statements.markdownImportStatement = markdownImportStatement;
  function markdownImageImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.markup').get('markdownImageImportStyle');
    configValue = providers.markdownImage.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`![alt-text](${relativePath} "Hover text")`);
      case 1:
        return new vscode__namespace.SnippetString(`![alt-text][image] / [image]: ${relativePath} "Hover text"`);
      default:
        return new vscode__namespace.SnippetString(`![alt-text](${relativePath} "Hover text")`);
    }
  }
  statements.markdownImageImportStatement = markdownImageImportStatement;
  function javascriptImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('javascriptImportStyle');
    configValue = providers.javascript.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`import $1 from '${relativePath}';`);
      case 1:
        return new vscode__namespace.SnippetString(`import { $1 } from '${relativePath}';`);
      case 2:
        return new vscode__namespace.SnippetString(`import { $1 as $2 } from '${relativePath}';`);
      case 3:
        return new vscode__namespace.SnippetString(`import * as $1 from '${relativePath}';`);
      case 4:
        return new vscode__namespace.SnippetString(`import '${relativePath}';`);
      case 5:
        return new vscode__namespace.SnippetString(`var $1 = require('${relativePath}');`);
      case 6:
        return new vscode__namespace.SnippetString(`const $1 = require('${relativePath}');`);
      case 7:
        return new vscode__namespace.SnippetString(`var $1 = import('${relativePath}');`);
      case 8:
        return new vscode__namespace.SnippetString(`const $1 = import('${relativePath}');`);
      default:
        return new vscode__namespace.SnippetString(`import $1 from '${relativePath}';`);
    }
  }
  statements.javascriptImportStatement = javascriptImportStatement;
  function typescriptImportStatement(relativePath) {
    let configValue = vscode__namespace.workspace.getConfiguration('auto-import.importStatement.script').get('typescriptImportStyle');
    configValue = providers.typescript.find((config) => config.description === configValue)?.value;
    switch (configValue) {
      case 0:
        return new vscode__namespace.SnippetString(`import $1 from '${relativePath}';`);
      case 1:
        return new vscode__namespace.SnippetString(`import { ${importName(relativePath)} } from '${relativePath}';`);
      case 2:
        return new vscode__namespace.SnippetString(`import { $1 as $2 } from '${relativePath}';`);
      case 3:
        return new vscode__namespace.SnippetString(`import * as $1 from '${relativePath}';`);
      case 4:
        return new vscode__namespace.SnippetString(`import '${relativePath}';`);
      default:
        return new vscode__namespace.SnippetString(`import { $1 } from '${relativePath}';`);
    }
  }
  statements.typescriptImportStatement = typescriptImportStatement;
  function importName(relativePath) {
    if (relativePath.includes('.component') || relativePath.includes('.directive') || relativePath.includes('.pipe')) {
      const snackCase = path3__namespace.basename(relativePath).replace(/\./g, '-');
      return snackCase
        .split('-')
        .map((e) => e[0].toUpperCase() + e.slice(1))
        .join('');
    } else {
      return '$1';
    }
  }
})((statements ||= {}));
function getRelativePath(from, to) {
  const startChars = isSameDir(from, to) ? './' : '';
  const relativePath = toWindowsPath(relative2(from, to));
  return startChars + removeFileExt(relativePath);
}
function relative2(from, to) {
  return path3__namespace.relative(path3__namespace.dirname(from), to);
}
function toWindowsPath(relativePath) {
  return relativePath.replace(/\\/gi, '/');
}
function removeFileExt(relativePath) {
  const ext = getFileExt(relativePath);
  return relativePath.slice(0, -ext.length);
}
function isSameDir(from, to) {
  from = path3__namespace.parse(from).dir.toLowerCase().trim();
  to = path3__namespace.parse(from).dir.toLowerCase().trim();
  return from === to || from.includes(to);
}

// src/src/subscriptions/auto-import-on-drop-provider.ts
class AutoImportOnDropProvider {
  async provideDocumentDropEdits(_document, position, dataTransfer, token) {
    const dataTransferItem = dataTransfer.get('text/plain');
    if (dataTransferItem === undefined) {
      return;
    }
    const dropFilePath = _document.uri.fsPath;
    const dragFilePath = dataTransferItem.value;
    if (dragFilePath.toLowerCase() === dropFilePath.toLowerCase()) {
      return;
    }
    const dropFileExt = getFileExt(dropFilePath);
    const dragFileExt = getFileExt(dragFilePath);
    if (
      any_true(
        () => {
          return permittedExts.includes(dropFileExt) === false && dragFileExt !== dropFileExt;
        },
        () => {
          return dragFileExt === '.html' && dropFileExt === '.html';
        },
        () => {
          return htmlSupported.includes(dragFileExt) === false && dropFileExt === '.html';
        },
        () => {
          return markdownSupported.includes(dragFileExt) === false && dropFileExt === '.md';
        },
        () => {
          return cssSupported.includes(dragFileExt) === false && dropFileExt === '.css';
        },
        () => {
          return scssSupported.includes(dragFileExt) === false && dropFileExt === '.scss';
        },
      )
    ) {
      return;
    }
    const snippet = importStatementSnippet(getRelativePath(dropFilePath, dragFilePath), dragFilePath, dropFilePath);
    if (
      snippet.value ===
      `
`
    ) {
      return;
    }
    return { insertText: snippet };
  }
}
function any_true(...conditions) {
  for (const condition of conditions) {
    if (condition() === true) return true;
  }
  return false;
}

// src/extension.module.ts
function activate(context) {
  context.subscriptions.push(vscode__namespace.languages.registerDocumentDropEditProvider(selectors, new AutoImportOnDropProvider()));
}

exports.activate = activate;
