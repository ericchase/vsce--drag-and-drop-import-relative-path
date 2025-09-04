import { BunPlatform_Argv_Includes } from '../src/lib/ericchase/BunPlatform_Argv_Includes.js';
import { Step_Dev_Format } from './core-dev/step/Step_Dev_Format.js';
import { Step_Dev_Project_Update_Config } from './core-dev/step/Step_Dev_Project_Update_Config.js';
import { Builder } from './core/Builder.js';
import { Processor_Merge_Files } from './core/processor/Processor_Merge_Files.js';
import { Processor_Set_Writable } from './core/processor/Processor_Set_Writable.js';
import { Processor_TypeScript_Generic_Bundler } from './core/processor/Processor_TypeScript_Generic_Bundler.js';
import { Step_Bun_Run } from './core/step/Step_Bun_Run.js';
import { Step_FS_Clean_Directory } from './core/step/Step_FS_Clean_Directory.js';
import { Step_FS_Copy_Files } from './core/step/Step_FS_Copy_Files.js';
import { Step_FS_Delete_Directory } from './core/step/Step_FS_Delete_Directory.js';
import { Step_FS_Move_Files } from './core/step/Step_FS_Move_Files.js';
import { Processor_JavaScript_Rollup } from './lib-vscode-extension/processors/Processor_JavaScript_Rollup.js';
import { Step_VSCE_Package } from './lib-vscode-extension/steps/Step_VSCE_Package.js';

// If needed, add `cache` directory to the logger's file writer.
// await AddLoggerOutputDirectory('cache');

// Use command line arguments to set developer mode.
if (BunPlatform_Argv_Includes('--dev')) {
  Builder.SetMode(Builder.MODE.DEV);
}
// Set the logging verbosity
Builder.SetVerbosity(Builder.VERBOSITY._1_LOG);

// These steps are run during the startup phase only.
Builder.SetStartUpSteps(
  Step_Dev_Project_Update_Config({ project_dir: '.' }),
  // Update packages manually
  // Step_Bun_Run({ cmd: ['bun', 'update', '--latest'], showlogs: false }),
  Step_Bun_Run({ cmd: ['bun', 'install'], showlogs: false }),
  Step_FS_Clean_Directory(Builder.Dir.Out),
  //
);

// These steps are run before each processing phase.
Builder.SetBeforeProcessingSteps();

// Basic setup for a TypeScript project. TypeScript files that match
// "*.module.ts" and "*.iife.ts" are bundled and written to the out folder. The
// other TypeScript files do not produce bundles. Module scripts
// ("*.module.ts") will not bundle other module scripts. Instead, they'll
// import whatever exports are needed from other module scripts. IIFE scripts
// ("*.iife.ts"), on the other hand, produce fully contained bundles. They do
// not import anything from anywhere. Use them accordingly.

// HTML custom components are a lightweight alternative to web components made
// possible by the processor I wrote.

// The processors are run for every file that added them during every
// processing phase.
Builder.SetProcessorModules(
  // Bundle the IIFE scripts and module scripts.
  Processor_TypeScript_Generic_Bundler({ target: 'node' }, { bundler_mode: 'iife', exclude_patterns: ['lib/server/hot-reload.iife.ts'] }),
  Processor_TypeScript_Generic_Bundler({ external: ['vscode'], target: 'node' }, { bundler_mode: 'module' }),
  Processor_JavaScript_Rollup({ external: ['vscode', 'path'] }),
  // Write non-bundle and non-library files.
  Processor_Set_Writable({
    include_patterns: [
      // src
      'package.json',
      'CHANGELOG.md',
      'README.md',
      // src/original-repo
      'original-repo/assets/**',
      'original-repo/DEMO.md',
      'original-repo/LICENSE.md',
      //
    ],
    value: true,
  }),
  Processor_Merge_Files(
    {
      type: 'json',
      merge_paths: ['original-repo/package.json', 'package.json'],
      out_path: 'package.json',
      modify: (data: any) => {
        // remove dev only stuff
        delete data.devDependencies;
        delete data.scripts;
        // remove auto-install of second extension
        delete data.extensionPack;
        // remove extra repo stuff
        delete data.author;
        delete data.badges;
        delete data.bugs;
        // update settings section title
        data.contributes.configuration[0].title = 'Drag And Drop Import Relative Path Fork';
        for (const [key, value] of Object.entries(data.contributes.configuration[0].properties)) {
          data.contributes.configuration[0].properties[key.replace('importStatements', 'drag-and-drop-import-relative-path-fork')] = value;
          delete data.contributes.configuration[0].properties[key];
        }
      },
    },
    {
      type: 'text',
      merge_paths: ['CHANGELOG.md', 'original-repo/CHANGELOG.md'],
      out_path: 'CHANGELOG.md',
    },
    {
      type: 'text',
      merge_paths: ['README.md', 'original-repo/README.md'],
      out_path: 'README.md',
    },
  ),
  //
);

// These steps are run after each processing phase.
Builder.SetAfterProcessingSteps(
  Step_FS_Copy_Files({
    include_patterns: ['**'],
    from_dir: `${Builder.Dir.Out}/original-repo`,
    into_dir: Builder.Dir.Out,
    overwrite: true,
  }),
  //
);

// These steps are run during the cleanup phase only.
Builder.SetCleanUpSteps(
  // Move original extension build files out of sub-folder
  Step_FS_Move_Files({
    include_patterns: ['**'],
    from_dir: `${Builder.Dir.Out}/original-repo`,
    into_dir: Builder.Dir.Out,
    overwrite: true,
  }),
  Step_FS_Delete_Directory(`${Builder.Dir.Out}/original-repo`),
  Step_Dev_Format({ showlogs: false }),
  Step_VSCE_Package({ release_dir: 'release' }),
  //
);

await Builder.Start();
