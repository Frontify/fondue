/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Options accepted by every adapter's lifecycle methods. Adapters are
 * free to ignore unsupported keys, but they must accept the shape.
 */
export interface AdapterOptions {
    /** Target the user-scope install instead of the project-scope one. */
    user?: boolean;
    /** Skip safety checks (overwrite existing installs, force removal, …). */
    force?: boolean;
}

/**
 * Pluggable target the `fondue` CLI can install / uninstall / inspect. Each
 * adapter is a separate way of exposing the SDK data to a consumer (Claude
 * Code skill, MCP server, REST endpoint, …). New adapters drop in by
 * exporting an `Adapter` object and registering it in `adapters/index.ts`.
 */
export interface Adapter {
    /** kebab-case identifier — what users type on the CLI. */
    readonly name: string;
    /** One-line description shown in `fondue adapter list`. */
    readonly description: string;

    install(options: AdapterOptions): void;
    uninstall(options: AdapterOptions): void;
    status(options: AdapterOptions): void;
}
