/* (c) Copyright Frontify Ltd., all rights reserved. */

import { replaceCssVariables, replaceTailwindClasses } from '@frontify/fondue-tokens/legacy/tools/replaceLegacyTokens';
import { Command } from 'commander';

import { findDeprecatedImports } from './codemod/findDeprecatedImports';

const program = new Command();

program.name('fondue-analyzer').description('Analyze fondue usage');

program
    .command('find-deprecated-imports')
    .description('Find imports of deprecated fondue functions and components')
    .argument('<path>', 'Path to be analyzed')
    .option('-o, --output <path>', 'Output path')
    .action((path: string, options: { output?: string }) => {
        findDeprecatedImports(path, options.output);
    });

program
    .command('migrate-tokens')
    .description('Migrate fondue tokens')
    .argument('<path>', 'Path to be analyzed')
    .option('--dry', 'Dry run')
    .option('--css', 'Migrate css variables')
    .option('--tailwind', 'Migrate tailwind classes')
    .action((path: string, options: { dry?: boolean; css?: boolean; tailwind?: boolean }) => {
        if (options.css || !options.tailwind) {
            replaceCssVariables(path, { dryRun: options.dry });
        }
        if (options.tailwind || !options.css) {
            replaceTailwindClasses(path, { dryRun: options.dry });
        }
    });
program.parse();
