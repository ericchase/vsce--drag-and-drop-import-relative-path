import * as vscode from 'vscode';
import { NotifyType } from '../model/enums.js';

/**
 * Notification actions
 * @param {NotifyType} type Indicated notification type
 * @returns {vscode.DocumentDropEdit} undefined text in active text editor.
 */
export function notify(type: NotifyType): vscode.DocumentDropEdit | undefined {
  switch (type) {
    case NotifyType.SameFilePath: {
      /* 
        Emit same file path, window notification (warning)
      */
      vscode.window.showWarningMessage(`Same file path.`);
      return;
    }
    case NotifyType.NotSupported: {
      /* 
        Emit not supported, window notification (warning)
      */
      vscode.window.showWarningMessage(`Not supported.`);
      return;
    }
  }
}
