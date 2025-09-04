import * as path from 'path';
import * as vscode from 'vscode';
import { ImportStyle } from '../model/interfaces.js';
import { FileExtension } from '../model/types.js';
import { getFileExt } from './file-extension.js';
import { getImportType } from './import-type.js';

/**
 * Get calculated import style to append in editor.
 * @param {string} relativePath Calculated relative path from dragged file and text editor.
 * @param {string} fromFilepath Dragged file path.
 * @param {string} toFilepath Dropped file path.
 * @returns Import statement string
 */
export function importStatementSnippet(relativePath: string, fromFilepath: string, toFilepath: string): vscode.SnippetString {
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

namespace providers {
  /* 
  Javascript/Javascript React/Typescript/Typescript React Import styles
  */
  export const javascript: ImportStyle[] = [
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
  /* 
  Javascript/Javascript React/Typescript/Typescript React Import styles
  */
  export const typescript: ImportStyle[] = [
    { value: 0, description: "import name from '_relativePath_';" },
    { value: 1, description: "import { name } from '_relativePath_';" },
    { value: 2, description: "import { default as name } from '_relativePath_';" },
    { value: 3, description: "import * as name from '_relativePath_';" },
    { value: 4, description: "import '_relativePath_';" },
  ];
  /* 
  CSS Import styles
  */
  export const css: ImportStyle[] = [
    { value: 0, description: "@import '_relativePath_';" },
    { value: 1, description: "@import url('_relativePath_');" },
  ];
  /* 
  CSS Import styles
  */
  export const cssImage: ImportStyle[] = [{ value: 0, description: "url('_relativePath_')" }];
  /* 
  CSS preprocessor, SCSS Import styles
  */
  export const scss: ImportStyle[] = [
    { value: 0, description: "@import '_relativePath_';" },
    { value: 1, description: "@import url('_relativePath_');" },
    { value: 2, description: "@use '_relativePath_';" },
    { value: 3, description: "@use '_relativePath_' as *;" },
  ];
  /* 
  CSS preprocessor, SCSS Import styles
  */
  export const scssImage: ImportStyle[] = [{ value: 0, description: "url('_relativePath_')" }];
  /* 
  HTML scripts Import styles
  */
  export const HTMLScript: ImportStyle[] = [{ value: 0, description: '<script src="_relativePath_"></script>' }];
  /* 
  HTML image Import styles
  */
  export const HTMLImage: ImportStyle[] = [{ value: 0, description: '<img src="_relativePath_" alt="sample">' }];
  /* 
  HTML stylesheets Import styles
  */
  export const HTMLStylesheet: ImportStyle[] = [{ value: 0, description: '<link rel="stylesheet" href="_relativePath_">' }];
  /* 
  Markdown Import styles
  */
  export const markdown: ImportStyle[] = [{ value: 0, description: '![text](_relativePath_)' }];
  /* 
  Markdown (image) Import styles
  */
  export const markdownImage: ImportStyle[] = [
    { value: 0, description: '![alt-text](_relativePath_ "Hover text")' },
    { value: 1, description: '![alt-text][image] / [image]: _relativePath_ "Hover text"' },
  ];
}

namespace snippets {
  export namespace css {
    /**
     * Returns the import statement
     * @param {string} relativePath Relative path of dragged file and active text editor.
     * @param {string} fromFilepath File extension of the dragged file.
     * @param {ImportType} importType Import type
     * @returns Import statement string
     */
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      switch (getImportType(fromFilepath)) {
        case 'image':
          return statements.cssImageImportStatement(relativePath + getFileExt(fromFilepath));
        default:
          return statements.cssImportStatement(relativePath + getFileExt(fromFilepath));
      }
    }
  }
  export namespace html {
    /**
     * Returns the import statement
     * @param {string} relativePath Relative path of dragged file and active text editor.
     * @param {string} fromFilepath File extension of the dragged file.
     * @returns Import statement string
     */
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
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
  }
  export namespace javascript {
    /**
     * Returns the import statement
     * @param {string} relativePath Relative path of dragged file and active text editor.
     * @param {string} fromFilepath File extension of the dragged file.
     * @returns Import statement string
     */
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      const preserve = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.script').get('preserveScriptFileExtension');
      const fileType = preserve ? getFileExt(fromFilepath) : '';
      return statements.javascriptImportStatement(relativePath + fileType);
    }
  }
  export namespace jsx {
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      switch (getFileExt(fromFilepath) as FileExtension) {
        case '.gif': // Images
        case '.jpeg':
        case '.jpg':
        case '.png':
        case '.webp':
        case '.json': // Data
        case '.js': // Scripts
        case '.jsx':
        case '.html': // HTML
        case '.yml': // YAML
        case '.yaml':
        case '.md': {
          // MD
          return new vscode.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
        }
        case '.woff': // Fonts
        case '.woff2':
        case '.ttf':
        case '.eot':
        case '.css': // Stylesheets
        case '.scss': {
          return new vscode.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
        }
        default: {
          return new vscode.SnippetString(``);
        }
      }
    }
  }
  export namespace markdown {
    /**
     * Returns the import statement
     * @param {string} relativePath Relative path of dragged file and active text editor.
     * @param {string} fromFilepath File extension of the dragged file.
     * @returns Import statement string
     */
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      switch (getImportType(fromFilepath)) {
        case 'markdown':
          return statements.markdownImportStatement(relativePath + getFileExt(fromFilepath));
        case 'image':
          return statements.markdownImageImportStatement(relativePath + getFileExt(fromFilepath));
      }
      throw new Error('Matched nothing.');
    }
  }
  export namespace scss {
    /**
     * Returns the import statement
     * @param {string} relativePath Relative path of dragged file and active text editor.
     * @param {string} fromFilepath File extension of the dragged file.
     * @returns Import statement string
     */
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      switch (getImportType(fromFilepath)) {
        case 'image':
          return statements.cssImageImportStatement(relativePath + getFileExt(fromFilepath));
        default:
          return statements.scssImportStatement(relativePath + getScssFileExt(fromFilepath));
      }
    }
    /**
     * Get SCSS file extension.
     * @param {string} fromFilepath Dragged file path.
     * @returns CSS file extension if fromFilepath ext is .css else none
     */
    function getScssFileExt(fromFilepath: string): string {
      if (getFileExt(fromFilepath) === '.css') {
        // Auto preserve file extension if file extension is CSS
        return getFileExt(fromFilepath);
      } else {
        const preserve = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.styleSheet').get('preserveStylesheetFileExtension');
        return preserve ? getFileExt(fromFilepath) : '';
      }
    }
  }
  export namespace tsx {
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      switch (getFileExt(fromFilepath) as FileExtension) {
        case '.gif': // Images
        case '.jpeg':
        case '.jpg':
        case '.png':
        case '.webp':
        case '.json': // Data
        case '.ts':
        case '.js': // Scripts
        case '.tsx':
        case '.html': // HTML
        case '.yml': // YAML
        case '.yaml':
        case '.md': {
          // MD
          return new vscode.SnippetString(`import name$1 from '${relativePath + getFileExt(fromFilepath)}';`);
        }
        case '.woff': // Fonts
        case '.woff2':
        case '.ttf':
        case '.eot':
        case '.css': // Stylesheets
        case '.scss': {
          return new vscode.SnippetString(`import '${relativePath + getFileExt(fromFilepath)}';`);
        }
        default: {
          return new vscode.SnippetString(``);
        }
      }
    }
  }
  export namespace typescript {
    /**
     * Returns the import statement
     * @param {string} relativePath Relative path of dragged file and active text editor.
     * @param {string} fromFilepath File extension of the active text editor.
     * @returns Import statement string
     */
    export function snippet(relativePath: string, fromFilepath: string): vscode.SnippetString {
      const preserve = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.script').get('preserveScriptFileExtension');
      let fileType = preserve ? getFileExt(fromFilepath) : '';
      return statements.typescriptImportStatement(relativePath + fileType);
    }
  }
}

namespace statements {
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function cssImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.styleSheet').get('cssImportStyle');
    configValue = providers.css.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`@import '${relativePath}';`);
      case 1:
        return new vscode.SnippetString(`@import url('${relativePath}');`);
      default:
        return new vscode.SnippetString(`@import '${relativePath}';`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function cssImageImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.styleSheet').get('cssImageImportStyle');
    configValue = providers.cssImage.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`url('${relativePath}')`);
      default:
        return new vscode.SnippetString(`url('${relativePath}')`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function scssImportStatement(relativePath: string): vscode.SnippetString {
    relativePath = parsePartialFile(relativePath);
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.styleSheet').get('scssImportStyle');
    configValue = providers.scss.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`@import '${relativePath}';`);
      case 1:
        return new vscode.SnippetString(`@import url('${relativePath}');`);
      case 2:
        return new vscode.SnippetString(`@use '${relativePath}';`);
      case 3:
        return new vscode.SnippetString(`@use '${relativePath}'; as $1`);
      default:
        return new vscode.SnippetString(`@import '${relativePath}';`);
    }
  }
  function parsePartialFile(relativePath: string): string {
    const arr = relativePath.split('/');
    const lastElemIndex = arr.length - 1;
    arr[lastElemIndex].startsWith('_') && (arr[lastElemIndex] = arr[lastElemIndex].substring(1));
    return arr.join('/');
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function scssImageImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.styleSheet').get('scssImageImportStyle');
    configValue = providers.scssImage.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`url('${relativePath}')`);
      default:
        return new vscode.SnippetString(`url('${relativePath}')`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function htmlScriptImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.markup').get('htmlScriptImportStyle');
    configValue = providers.HTMLScript.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`<script src=\"${relativePath}\" defer></script>`);
      default:
        return new vscode.SnippetString(`<script src=\"${relativePath}\" defer></script>`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function htmlImageImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.markup').get('htmlImageImportStyle');
    configValue = providers.HTMLImage.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`<img src=\"${relativePath}\" alt=\"sample\">`);
      default:
        return new vscode.SnippetString(`<img src=\"${relativePath}\" alt=\"sample\">`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function htmlStylesheetImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.markup').get('htmlStyleSheetImportStyle');
    configValue = providers.HTMLStylesheet.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`<link rel=\"stylesheet\" href=\"${relativePath}\">`);
      default:
        return new vscode.SnippetString(`<link rel=\"stylesheet\" href=\"${relativePath}\">`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function markdownImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.markup').get('markdownImportStyle');
    configValue = providers.markdown.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`![text](${relativePath})`);
      default:
        return new vscode.SnippetString(`![text](${relativePath})`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function markdownImageImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.markup').get('markdownImageImportStyle');
    configValue = providers.markdownImage.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`![alt-text](${relativePath} \"Hover text\")`);
      case 1:
        return new vscode.SnippetString(`![alt-text][image] / [image]: ${relativePath} \"Hover text\"`);
      default:
        return new vscode.SnippetString(`![alt-text](${relativePath} \"Hover text\")`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function javascriptImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.script').get('javascriptImportStyle');
    configValue = providers.javascript.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`import $1 from '${relativePath}';`);
      case 1:
        return new vscode.SnippetString(`import { $1 } from '${relativePath}';`);
      case 2:
        return new vscode.SnippetString(`import { $1 as $2 } from '${relativePath}';`);
      case 3:
        return new vscode.SnippetString(`import * as $1 from '${relativePath}';`);
      case 4:
        return new vscode.SnippetString(`import '${relativePath}';`);
      case 5:
        return new vscode.SnippetString(`var $1 = require('${relativePath}');`);
      case 6:
        return new vscode.SnippetString(`const $1 = require('${relativePath}');`);
      case 7:
        return new vscode.SnippetString(`var $1 = import('${relativePath}');`);
      case 8:
        return new vscode.SnippetString(`const $1 = import('${relativePath}');`);
      default:
        return new vscode.SnippetString(`import $1 from '${relativePath}';`);
    }
  }
  /**
   * Returns the Import statement string
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import statement string
   */
  export function typescriptImportStatement(relativePath: string): vscode.SnippetString {
    let configValue = vscode.workspace.getConfiguration('drag-and-drop-import-relative-path-fork.script').get('typescriptImportStyle');
    configValue = providers.typescript.find((config: ImportStyle) => config.description === configValue)?.value;
    switch (configValue as number) {
      case 0:
        return new vscode.SnippetString(`import $1 from '${relativePath}';`);
      case 1:
        return new vscode.SnippetString(`import { ${importName(relativePath)} } from '${relativePath}';`);
      case 2:
        return new vscode.SnippetString(`import { $1 as $2 } from '${relativePath}';`);
      case 3:
        return new vscode.SnippetString(`import * as $1 from '${relativePath}';`);
      case 4:
        return new vscode.SnippetString(`import '${relativePath}';`);
      default:
        return new vscode.SnippetString(`import { $1 } from '${relativePath}';`);
    }
  }
  /**
   * Returns a customized import name if the file is an Angular component.
   * @param {string} relativePath Relative path of dragged file and active text editor.
   * @returns Import name
   */
  function importName(relativePath: string): string {
    if (relativePath.includes('.component') || relativePath.includes('.directive') || relativePath.includes('.pipe')) {
      const snackCase = path.basename(relativePath).replace(/\./g, '-');
      return snackCase
        .split('-')
        .map((e) => e[0].toUpperCase() + e.slice(1))
        .join('');
    } else {
      return '$1';
    }
  }
}
