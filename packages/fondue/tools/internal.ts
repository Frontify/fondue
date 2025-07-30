/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Command } from 'commander';

import { findUnusedExports } from './codemod/findDeprecatedImports';

const program = new Command();

program.name('fondue-analyzer').description('Analyze fondue usage');

program
    .command('find-unused-exports')
    .description('Find unused fondue exports')
    .argument('<path>', 'Path to be analyzed')
    .option('--only-deprecated', 'Only find unused deprecated exports')
    .option('-o, --output <path>', 'Output path')
    .action((path: string, options: { output?: string; onlyDeprecated?: boolean }) => {
        findUnusedExports(path, options.output, options.onlyDeprecated);
    });

program.parse();
