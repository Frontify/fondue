/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compiledModel } from '../compile/compile';
import { canonicalJson, hashDocument, sha256 } from '../helpers/hash';
import {
    type CapabilityMigration,
    type ContentModel,
    type JsonObject,
    type JsonValue,
    type ModelMigration,
    type ModelRef,
} from '../vocabulary/declarations';
import {
    defaultLimits,
    type Diagnostic,
    diagnostic,
    type ResourceLimits,
    type RichTextDocument,
} from '../vocabulary/format';

import { checkEnvelope, findMisshapenCapabilities, isRoot } from './envelope';
import { randomId } from './randomId';
import { readInput } from './read';

/** A record of a migration run: the hashes before and after, and the steps that ran. */
export type MigrationManifest = {
    sourceHash: string;
    targetHash: string | null;
    steps: readonly string[];
    model: ModelRef;
    packageVersion: string;
    counts: Readonly<Record<string, number>>;
};
/** The outcome of migrating a document: its status, the resulting document and a manifest. */
export type MigrationResult = {
    status: 'current' | 'migrated' | 'requires-review' | 'unsupported';
    /** `requires-review`: the last step's output with unmapped content as stored; `unsupported`: null. */
    document: RichTextDocument | null;
    diagnostics: readonly Diagnostic[];
    manifest: MigrationManifest;
};

/** What `runMigrations` hands to decode: the migrated document and the facts the caller reports from it. */
export type Migrated = {
    /** `null` when a step blocks the document. */
    document: RichTextDocument | null;
    diagnostics: readonly Diagnostic[];
    steps: readonly string[];
    /** The node positions a `requires-review` step left as stored, which decode keeps as islands. */
    review: ReadonlySet<string>;
    reviewing: boolean;
    /** Whether the document records a lower model version or an installed capability at a lower version. */
    older: boolean;
};

/** A JSON Pointer to a node position below the root. */
const NODE_PATH = /^\/content(\/content\/(0|[1-9]\d*))+$/;

const valueAt = (document: RichTextDocument, path: string): unknown => {
    let value: unknown = document;
    for (const key of path.slice(1).split('/')) {
        if (typeof value !== 'object' || value === null) {
            return undefined;
        }

        value = (value as Record<string, unknown>)[key];
    }

    return value;
};

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

/** The steps that run for a stored document, and whether it is older than the target model. */
type MigrationPlan = {
    plan: (CapabilityMigration | ModelMigration)[];
    older: boolean;
};

/** The document a migration run has reached and what it has gathered to report. */
type MigrationProgress = {
    diagnostics: Diagnostic[];
    steps: string[];
    review: Map<string, string>;
    reviewing: boolean;
    current: RichTextDocument;
    older: boolean;
};

/** Each installed feature's steps from its recorded capability version, then the model's steps from its recorded version. */
const migrationPlan = (
    document: RichTextDocument,
    model: ContentModel,
    compiled: ReturnType<typeof compiledModel>,
): MigrationPlan => {
    const recorded = new Map(document.requiredCapabilities.map(({ id, version }) => [id, version]));
    const plan: (CapabilityMigration | ModelMigration)[] = [];
    let older = document.model.version < model.ref.version;
    const queue = (steps: readonly ModelMigration[] = [], from: number, to: number) => {
        const due = steps.filter((step) => step.from >= from && step.from < to);
        due.sort((earlier, later) => earlier.from - later.from);
        plan.push(...due);
    };

    for (const { id, version, declaration } of compiled.features) {
        const from = recorded.get(id) ?? version;
        older ||= from < version;
        queue(declaration.migrations, from, version);
    }

    queue(compiled.migrations, document.model.version, model.ref.version);

    return { plan, older };
};

const outcomeOf = (progress: MigrationProgress, result: RichTextDocument | null): Migrated => ({
    document: result,
    diagnostics: progress.diagnostics,
    steps: progress.steps,
    review: new Set(progress.review.keys()),
    reviewing: progress.reviewing,
    older: progress.older,
});

const blockMigration = (progress: MigrationProgress, stepId: string, cause?: string): Migrated => {
    const details: JsonObject = cause === undefined ? { step: stepId } : { step: stepId, cause };
    progress.diagnostics.push(diagnostic('migration.unsupported', undefined, details, 'error'));

    return outcomeOf(progress, null);
};

/** Applies one step to `progress`, or returns the blocked migration. `undefined` means the step advanced the document. */
const applyMigrationStep = (
    progress: MigrationProgress,
    step: CapabilityMigration | ModelMigration,
    generateId: () => string,
    limits: ResourceLimits,
): Migrated | undefined => {
    try {
        const result = step.migrate(progress.current, { generateId });
        if (result.status === 'unsupported') {
            progress.diagnostics.push(...result.diagnostics);

            return result.diagnostics.length > 0 ? outcomeOf(progress, null) : blockMigration(progress, step.id);
        }

        const read = readInput(result.document, limits);
        if (!read.ok) {
            return blockMigration(progress, step.id, read.diagnostic.code);
        }

        const { content, requiredCapabilities } = read.value as RichTextDocument;
        if (!isRoot(content)) {
            return blockMigration(progress, step.id, 'format.envelope-invalid');
        }

        // A step only adds capabilities, since content of a dropped one may survive as an island.
        const kept = merge(
            progress.current.requiredCapabilities,
            findMisshapenCapabilities(requiredCapabilities) === undefined ? requiredCapabilities : [],
        );
        const next: RichTextDocument = { ...progress.current, requiredCapabilities: kept, content };

        if ([...progress.review].some(([path, json]) => jsonAt(next, path) !== json)) {
            return blockMigration(progress, step.id);
        }

        if (result.status === 'requires-review') {
            progress.reviewing = true;
            for (const { path } of result.diagnostics) {
                if (path === undefined || !NODE_PATH.test(path) || valueAt(next, path) === undefined) {
                    return blockMigration(progress, step.id);
                }

                progress.review.set(path, jsonAt(next, path));
            }

            progress.diagnostics.push(...result.diagnostics);
        } else if (result.status !== 'migrated') {
            return blockMigration(progress, step.id);
        }

        progress.current = next;

        return undefined;
    } catch {
        return blockMigration(progress, step.id);
    }
};

/**
 * After the capability warnings: each installed feature's steps from its recorded capability
 * version, in model feature order, then the model's steps from the recorded model version. Each output passes the
 * read walk and the envelope checks again; the result records the target model and the installed capability versions.
 */
export const runMigrations = (
    document: RichTextDocument,
    model: ContentModel,
    generateId: () => string,
    limits: ResourceLimits,
): Migrated => {
    const compiled = compiledModel(model);
    const { plan, older } = migrationPlan(document, model, compiled);
    const progress: MigrationProgress = {
        diagnostics: [],
        steps: [],
        review: new Map(),
        reviewing: false,
        current: document,
        older,
    };

    for (const step of plan) {
        progress.steps.push(step.id);
        const blocked = applyMigrationStep(progress, step, generateId, limits);
        if (blocked !== undefined) {
            return blocked;
        }
    }

    if (!older) {
        return outcomeOf(progress, document);
    }

    return outcomeOf(progress, {
        ...progress.current,
        model: { ...model.ref },
        requiredCapabilities: merge(progress.current.requiredCapabilities, model.capabilities, false),
    });
};

type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, string>;
};

/** The package's own version, which Vite inlines from `package.json` when it builds or tests the module. */
export const packageVersionOf = (): string => {
    // A static JSON import would move the declaration root out of `src`, so Vite's glob import reads the version.
    const found = (import.meta as ViteImportMeta).glob('../../../package.json', { eager: true, import: 'version' });

    return Object.values(found)[0] ?? '';
};

/**
 * Runs the model's registered migrations on a stored document, in memory, with new `nodeId`s from `generateId`, and
 * reports the result with a manifest that holds only hashes, step IDs, the target model, the package version and
 * diagnostic counts. A document at the target model version or a higher one, with no installed capability at a
 * lower version, comes back unchanged as `current`.
 */
export const migrateDocument = (
    document: RichTextDocument,
    model: ContentModel,
    options: { generateId?: () => string } = {},
): MigrationResult => {
    const read = readInput(document, defaultLimits);
    const checked = read.ok ? checkEnvelope(read.value, model) : read;
    const migrated: Migrated = checked.ok
        ? runMigrations(checked.document, model, options.generateId ?? randomId, defaultLimits)
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
