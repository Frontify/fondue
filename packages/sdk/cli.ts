/* (c) Copyright Frontify Ltd., all rights reserved. */

/*
 * `fondue` CLI — top-level tool for `@frontify/fondue`.
 *
 *   npx @frontify/fondue adapter install   <name> [--user] [--force]
 *   npx @frontify/fondue adapter uninstall <name> [--user] [--force]
 *   npx @frontify/fondue adapter status    [name] [--user]
 *   npx @frontify/fondue adapter list
 *
 * Adapters are plug-in install targets — Claude Code skill, MCP server,
 * REST endpoint, and so on. See `adapters/index.ts` for the registry.
 * `install` is idempotent: running it again refreshes the existing install in
 * place (carrying forward the same target directory and bumping the stamp),
 * so users have one verb for both "set this up" and "pull the latest". The
 * `adapter` noun groups every adapter-related command and leaves the
 * top level free for future surfaces (codemods, generators, project init).
 *
 * `install` and `uninstall` always require an explicit name so users
 * consciously pick the surface they're modifying — even when only one
 * adapter is registered today, more are coming and silent auto-pick
 * would change behavior under their feet. Run `fondue adapter list` to
 * see what's available.
 */

import { Command } from 'commander';

import { ADAPTERS } from './adapters';
import { fail, log } from './adapters/io';
import { type Adapter, type AdapterOptions } from './adapters/types';

// ─── Adapter selection ─────────────────────────────────────────────────────

const adapterNames = (): string => ADAPTERS.map((i) => i.name).join(', ');

/** Multi-line, human-readable rundown of every registered adapter. */
const adapterCatalog = (): string => {
    const width = Math.max(...ADAPTERS.map((i) => i.name.length));
    return ADAPTERS.map((i) => `  ${i.name.padEnd(width)}  ${i.description}`).join('\n');
};

const requireAdapter = (name: string | undefined, verb: string): Adapter => {
    if (name === undefined) {
        return fail(
            `Specify which adapter to ${verb}. Available:\n${adapterCatalog()}\n\n` +
                `Example: fondue adapter ${verb} ${ADAPTERS[0]?.name ?? '<name>'}`,
        );
    }
    const adapter = ADAPTERS.find((i) => i.name === name);
    if (adapter !== undefined) {
        return adapter;
    }
    return fail(`Unknown adapter "${name}". Available: ${adapterNames()}.`);
};

// ─── Program ───────────────────────────────────────────────────────────────

const program = new Command().name('fondue').description('CLI for Frontify Fondue.').version(__FONDUE_VERSION__);

// ─── `fondue adapter …` ────────────────────────────────────────────────────

const adapter = program
    .command('adapter')
    .description('Install and manage Fondue SDK adapters (Claude Code skill, MCP, REST, …).');

adapter
    .command('install [name]')
    .aliases(['add', 'update'])
    .description(
        'Install an adapter, or refresh an existing install in place. Run `adapter list` to see what `<name>` accepts.',
    )
    .option('--user', 'Install for the current user instead of the current project')
    .option('--force', 'Overwrite a directory at the target path that was not installed by this CLI')
    .action((name: string | undefined, options: AdapterOptions) => {
        requireAdapter(name, 'install').install(options);
    });

adapter
    .command('uninstall [name]')
    .alias('remove')
    .description('Uninstall an adapter previously installed by this CLI.')
    .option('--user', 'Target the user-scope install')
    .option('--force', 'Force removal even if not installed by this CLI')
    .action((name: string | undefined, options: AdapterOptions) => {
        requireAdapter(name, 'uninstall').uninstall(options);
    });

adapter
    .command('status [name]')
    .description('Show installation status for one adapter, or every adapter when no name is given.')
    .option('--user', 'Target the user-scope install')
    .action((name: string | undefined, options: AdapterOptions) => {
        if (name !== undefined) {
            requireAdapter(name, 'status').status(options);
            return;
        }
        for (const [index, registered] of ADAPTERS.entries()) {
            if (index > 0) {
                log('');
            }
            log(`[${registered.name}]`);
            registered.status(options);
        }
    });

adapter
    .command('list')
    .alias('ls')
    .description('List every registered adapter and what it does.')
    .action(() => {
        log(adapterCatalog());
    });

program.parse();
