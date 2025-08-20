import * as vscode from 'vscode';

import { importStatement } from '../import-statements';
import { getFileExt, getImportType } from '../utilities';

/**
 * Returns the import statement
 * @param {string} relativePath Relative path of dragged file and active text editor.
 * @param {string} fromFilepath File extension of the dragged file.
 * @returns Import statement string
 */
export function snippet(
  relativePath: string,
  fromFilepath: string
): vscode.SnippetString {
  switch (getImportType(fromFilepath)) {
    case 'script':     return importStatement.htmlScriptImportStatement(relativePath + getFileExt(fromFilepath));
    case 'image':      return importStatement.htmlImageImportStatement(relativePath + getFileExt(fromFilepath));
    case 'stylesheet': return importStatement.htmlStylesheetImportStatement(relativePath + getFileExt(fromFilepath));
  }
}
