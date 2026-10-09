/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compiledModel } from './compile';
import {
    type CapabilityMigration,
    type ContentModel,
    type JsonObject,
    type JsonValue,
    type ModelMigration,
    type ModelRef,
} from './declarations';
import { checkEnvelope, findMisshapenCapabilities, isRoot } from './envelope';
import { defaultIdSource, type IdSource } from './environment';
import { defaultLimits, type Diagnostic, diagnostic, type ResourceLimits, type RichTextDocument } from './format';
import { canonicalJson, hashDocument, sha256 } from './hash';
import { readInput } from './read';

export interface MigrationManifest {
    readonly sourceHash: string;
    readonly targetHash: string | null;
    readonly steps: readonly string[];
    readonly model: ModelRef;
    readonly packageVersion: string;
    readonly counts: Readonly<Record<string, number>>;
}
export interface MigrationResult {
    readonly status: 'current' | 'migrated' | 'requires-review' | 'unsupported';
    /** `requires-review`: the last step's output with unmapped content as stored; `unsupported`: null. */
    readonly document: RichTextDocument | null;
    readonly diagnostics: readonly Diagnostic[];
    readonly manifest: MigrationManifest;
}

export interface Migrated {
    /** `null` when a step blocks the document. */
    readonly document: RichTextDocument | null;
    readonly diagnostics: readonly Diagnostic[];
    readonly steps: readonly string[];
    /** The node positions a `requires-review` step left as stored, which decode keeps as islands. */
    readonly review: ReadonlySet<string>;
    readonly reviewing: boolean;
    /** Whether the document records a lower model version or an installed capability at a lower version. */
    readonly older: boolean;
}

/** A JSON Pointer to a node position below the root. */
const NODE_PATH = /^\/content(\/content\/(0|[1-9]\d*))+$/;

const valueAt = (document: RichTextDocument, path: string): unknown =>
    path
        .slice(1)
        .split('/')
        .reduce<unknown>(
            (value, key) =>
                typeof value === 'object' && value !== null ? (value as Record<string, unknown>)[key] : undefined,
            document,
        );

const jsonAt = (document: RichTextDocument, path: string) => canonicalJson(valueAt(document, path) as JsonValue);

type Capabilities = RichTextDocument['requiredCapabilities'];

/** `into` with each ID of `from` at the higher version, sorted by ID; with `add` false, only IDs `into` lists. */
const merge = (into: Capabilities, from: Capabilities, add = true): Capabilities => {
    const versions = new Map(into.map(({ id, version }) => [id, version]));
    for (const { id, version } of from) {
        const known = versions.get(id);
        if (add || known !== undefined) {
            versions.set(id, Math.max(version, known ?? version));
        }
    }
    return [...versions.keys()].sort().map((id) => ({ id, version: versions.get(id) ?? 0 }));
};

/**
 * Decode order step 3 after the capability warnings: each installed feature's steps from its recorded capability
 * version, in model feature order, then the model's steps from the recorded model version. Each output passes the
 * read walk and the envelope checks again; the result records the target model and the installed capability versions.
 */
export const runMigrations = (
    document: RichTextDocument,
    model: ContentModel,
    ids: IdSource,
    limits: ResourceLimits,
): Migrated => {
    const compiled = compiledModel(model);
    const recorded = new Map(document.requiredCapabilities.map(({ id, version }) => [id, version]));
    const plan: (CapabilityMigration | ModelMigration)[] = [];
    let older = document.model.version < model.ref.version;
    const queue = (steps: readonly ModelMigration[] = [], from: number, to: number) => {
        plan.push(...steps.filter((step) => step.from >= from && step.from < to).sort((a, b) => a.from - b.from));
    };
    for (const { id, version, declaration } of compiled.features) {
        const from = recorded.get(id) ?? version;
        older ||= from < version;
        queue(declaration.migrations, from, version);
    }
    queue(compiled.migrations, document.model.version, model.ref.version);

    const diagnostics: Diagnostic[] = [];
    const steps: string[] = [];
    const review = new Map<string, string>();
    let reviewing = false;
    let current = document;
    const outcome = (result: RichTextDocument | null): Migrated => ({
        document: result,
        diagnostics,
        steps,
        review: new Set(review.keys()),
        reviewing,
        older,
    });
    for (const step of plan) {
        steps.push(step.id);
        const block = (cause?: string) => {
            const details: JsonObject = cause === undefined ? { step: step.id } : { step: step.id, cause };
            diagnostics.push(diagnostic('migration.unsupported', undefined, details, 'error'));
            return outcome(null);
        };
        try {
            const result = step.migrate(current, { ids });
            if (result.status === 'unsupported') {
                diagnostics.push(...result.diagnostics);
                return result.diagnostics.length > 0 ? outcome(null) : block();
            }
            const read = readInput(result.document, limits);
            if (!read.ok) {
                return block(read.diagnostic.code);
            }
            const { content, requiredCapabilities } = read.value as RichTextDocument;
            if (!isRoot(content)) {
                return block('format.envelope-invalid');
            }
            // A step only adds capabilities, since content of a dropped one may survive as an island (AC-033).
            const kept = merge(
                current.requiredCapabilities,
                findMisshapenCapabilities(requiredCapabilities) === undefined ? requiredCapabilities : [],
            );
            const next: RichTextDocument = { ...current, requiredCapabilities: kept, content };
            if ([...review].some(([path, json]) => jsonAt(next, path) !== json)) {
                return block();
            }
            if (result.status === 'requires-review') {
                reviewing = true;
                for (const { path } of result.diagnostics) {
                    if (path === undefined || !NODE_PATH.test(path) || valueAt(next, path) === undefined) {
                        return block();
                    }
                    review.set(path, jsonAt(next, path));
                }
                diagnostics.push(...result.diagnostics);
            } else if (result.status !== 'migrated') {
                return block();
            }
            current = next;
        } catch {
            return block();
        }
    }
    if (!older) {
        return outcome(document);
    }
    return outcome({
        ...current,
        model: { ...model.ref },
        requiredCapabilities: merge(current.requiredCapabilities, model.capabilities, false),
    });
};

type ViteImportMeta = ImportMeta & {
    readonly glob: (
        pattern: string,
        options: { readonly eager: true; readonly import: string },
    ) => Record<string, string>;
};

/** The package's own version, which Vite inlines from `package.json` when it builds or tests the module. */
export const packageVersionOf = (): string => {
    // A static JSON import would move the declaration root out of `src`, so Vite's glob import reads the version.
    const found = (import.meta as ViteImportMeta).glob('../../package.json', { eager: true, import: 'version' });
    return Object.values(found)[0] ?? '';
};

/**
 * Runs the model's registered migrations on a stored document, in memory, with new `nodeId`s from `ids`, and
 * reports the result with a manifest that holds only hashes, step IDs, the target model, the package version and
 * diagnostic counts. A document at the target model version or a higher one, with no installed capability at a
 * lower version, comes back unchanged as `current`.
 */
export const migrateDocument = (
    document: RichTextDocument,
    model: ContentModel,
    options: { readonly ids?: IdSource } = {},
): MigrationResult => {
    const read = readInput(document, defaultLimits);
    const checked = read.ok ? checkEnvelope(read.value, model) : read;
    const migrated: Migrated = checked.ok
        ? runMigrations(checked.document, model, options.ids ?? defaultIdSource, defaultLimits)
        : {
              document: null,
              diagnostics: [checked.diagnostic],
              steps: [],
              review: new Set(),
              reviewing: false,
              older: false,
          };
    let status: MigrationResult['status'] = migrated.older ? 'migrated' : 'current';
    if (migrated.document === null) {
        status = 'unsupported';
    } else if (migrated.reviewing) {
        status = 'requires-review';
    }
    const result = status === 'current' ? document : migrated.document;
    const counts: Record<string, number> = {};
    for (const { code } of migrated.diagnostics) {
        counts[code] = (counts[code] ?? 0) + 1;
    }
    return {
        status,
        document: result,
        diagnostics: migrated.diagnostics,
        manifest: {
            // A value that is not JSON has no canonical form, so it hashes as the empty source.
            sourceHash: read.ok ? hashDocument(read.value as RichTextDocument) : sha256(''),
            targetHash: result === null ? null : hashDocument(result),
            steps: migrated.steps,
            model: { ...model.ref },
            packageVersion: packageVersionOf(),
            counts,
        },
    };
};
