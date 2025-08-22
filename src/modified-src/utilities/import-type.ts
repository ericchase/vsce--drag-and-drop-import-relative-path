import { ImportType } from '../model/types.js';
import { getFileExt } from './file-extension.js';

/**
 * Get Import type.
 * @param {string} relativePath Calculated relative path from dragged file and text editor.
 * @returns Import type
 */
export function getImportType(relativePath: string): ImportType | null {
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
