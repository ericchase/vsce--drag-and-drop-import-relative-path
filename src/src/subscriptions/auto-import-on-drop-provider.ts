import * as vscode from 'vscode';

import { cssSupported, htmlSupported, markdownSupported, permittedExts, scssSupported } from '../providers/supported-file-extensions.js';
import { getFileExt } from '../utilities/file-extension.js';
import { importStatementSnippet } from '../utilities/import-statement-snippet.js';
import { getRelativePath } from '../utilities/relative-path.js';

/* 
  Drag and drop handler
 */
export class AutoImportOnDropProvider implements vscode.DocumentDropEditProvider {
  async provideDocumentDropEdits(
    _document: vscode.TextDocument,
    position: vscode.Position,
    dataTransfer: vscode.DataTransfer,
    token: vscode.CancellationToken,
    //
  ): Promise<vscode.DocumentDropEdit | undefined> {
    // Get the active text editor file path and dragged file path from tree view
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
      // Prevents unsupported drag and drop
      any_true(
        () => {
          // Checks unsupported drag and drop files
          return permittedExts.includes(dropFileExt) === false && dragFileExt !== dropFileExt;
        },
        () => {
          // Checks HTML to HTML drag and drop
          return dragFileExt === '.html' && dropFileExt === '.html';
        },
        () => {
          // Checks unsupported HTML drag import file extensions
          return htmlSupported.includes(dragFileExt) === false && dropFileExt === '.html';
        },
        () => {
          // Checks unsupported Markdown drag import file extensions
          return markdownSupported.includes(dragFileExt) === false && dropFileExt === '.md';
        },
        () => {
          // Checks unsupported CSS drag import file extensions
          return cssSupported.includes(dragFileExt) === false && dropFileExt === '.css';
        },
        () => {
          // Checks unsupported SCSS drag import file extensions
          return scssSupported.includes(dragFileExt) === false && dropFileExt === '.scss';
        },
      )
    ) {
      return;
    }

    const snippet = importStatementSnippet(getRelativePath(dropFilePath, dragFilePath), dragFilePath, dropFilePath);

    if (snippet.value === '\n') {
      return;
    }

    return { insertText: snippet };
  }
}

/**
 * @param {...(() => boolean)} conditions - Functions that return boolean values.
 * @returns {boolean} Returns true if any condition is true.
 */
function any_true(...conditions: (() => boolean)[]): boolean {
  for (const condition of conditions) {
    if (condition() === true) return true;
  }
  return false;
}
