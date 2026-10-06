/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { compiledModel } from '../src/model/compile.ts';
import { canonicalJson, sha256 } from '../src/model/hash.ts';
import {
    compileContentModel,
    type ContentModelOptions,
    type Feature,
    type JsonObject,
    type JsonValue,
    type ModelRef,
    toJsonSchema,
} from '../src/model/index.ts';

/** What a model stores: its reference, each capability with a hash of its own schema, and the model's schema. */
export interface ModelSnapshot {
    readonly model: ModelRef;
    readonly capabilities: readonly { readonly id: string; readonly version: number; readonly schema: string }[];
    readonly schema: JsonObject;
}
export interface ModelCandidate {
    readonly snapshot: ModelSnapshot;
    /** The `from` versions of the registered steps: the model's, and each capability's by ID. */
    readonly steps: {
        readonly model: readonly number[];
        readonly capabilities: Readonly<Record<string, readonly number[]>>;
    };
}

const SNAPSHOT = new URL('../fixtures/model-versions.json', import.meta.url);
const hashOf = (value: JsonValue) => sha256(canonicalJson(value));

export const candidateOf = (features: readonly Feature[], options: ContentModelOptions): ModelCandidate => {
    const model = compileContentModel(features, options);
    const compiled = compiledModel(model);
    return {
        snapshot: {
            model: model.ref,
            capabilities: features.map((feature) => ({
                id: feature.id,
                version: feature.version,
                schema: hashOf(toJsonSchema(feature)),
            })),
            schema: toJsonSchema(model),
        },
        steps: {
            model: compiled.migrations.map(({ from }) => from),
            capabilities: Object.fromEntries(
                compiled.features.map(({ id, declaration }) => [
                    id,
                    (declaration.migrations ?? []).map(({ from }) => from),
                ]),
            ),
        },
    };
};

const isObject = (value: unknown): value is JsonObject =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Whether `next` only adds to `previous`: new definitions, properties, alternatives and enumeration values, with
 * `required` unchanged, so every document `previous` accepts still passes.
 */
export const onlyAdds = (previous: JsonValue | undefined, next: JsonValue | undefined, key = ''): boolean => {
    if (canonicalJson(previous ?? null) === canonicalJson(next ?? null)) {
        return true;
    }
    if (Array.isArray(previous) && Array.isArray(next) && (key === 'oneOf' || key === 'enum')) {
        const items = new Set((next as readonly JsonValue[]).map((item) => canonicalJson(item)));
        return (previous as readonly JsonValue[]).every((item) => items.has(canonicalJson(item)));
    }
    if (!isObject(previous) || !isObject(next)) {
        return false;
    }
    // A single alternative becomes a `oneOf` once a second one is added.
    const alternatives = Array.isArray(next.oneOf) ? (next.oneOf as readonly JsonValue[]) : [];
    if (!('oneOf' in previous) && alternatives.some((item) => onlyAdds(previous, item))) {
        return true;
    }
    const open = key === 'properties' || key === '$defs';
    return (
        Object.keys(next).every((name) => open || Object.hasOwn(previous, name)) &&
        Object.keys(previous).every((name) => onlyAdds(previous[name], next[name], name))
    );
};

/** Problems with going from the committed snapshot to the current model (SPEC-rich-text-format/AC-034, AC-042). */
export const compareModel = (previous: ModelSnapshot, current: ModelCandidate): string[] => {
    const { snapshot, steps } = current;
    const { id, version } = snapshot.model;
    const before = previous.model.version;
    const problems: string[] = [];
    const changed = canonicalJson(previous.schema) !== canonicalJson(snapshot.schema);
    if (changed && version !== before + 1) {
        problems.push(`${id}: the stored representation changed, so model version ${before} must become ${before + 1}`);
    }
    if (
        !changed &&
        version !== before &&
        canonicalJson(previous.capabilities) === canonicalJson(snapshot.capabilities)
    ) {
        problems.push(`${id}: model version ${before} became ${version} with no change to the stored representation`);
    }
    const migrated =
        steps.model.includes(before) ||
        previous.capabilities.some((capability) =>
            (steps.capabilities[capability.id] ?? []).includes(capability.version),
        );
    if (!onlyAdds(previous.schema, snapshot.schema) && !migrated) {
        problems.push(`${id}: a node, mark or attribute was removed or changed with no registered migration from it`);
    }
    for (const capability of snapshot.capabilities) {
        const earlier = previous.capabilities.find((entry) => entry.id === capability.id);
        if (earlier !== undefined && earlier.version === capability.version && earlier.schema !== capability.schema) {
            problems.push(
                `${id}: capability ${capability.id} changed its nodes, marks or attributes inside version ${capability.version}`,
            );
        }
    }
    return problems;
};

/** The shipped models by snapshot name. */
const shippedModels = async (): Promise<Record<string, ModelCandidate>> => {
    // Feature modules import through the `#/` alias, which `tsx` resolves and the node typecheck project does not.
    const { core } = (await import(new URL('../src/features/core/feature.ts', import.meta.url).href)) as {
        readonly core: () => Feature;
    };
    return { core: candidateOf([core()], { id: 'core', version: 1 }) };
};

/** Compares every shipped model with the committed snapshot; with `update`, records a valid change. */
export const checkModelVersions = async (update = false): Promise<string[]> => {
    const committed = JSON.parse(readFileSync(SNAPSHOT, 'utf8')) as Record<string, ModelSnapshot>;
    const models = await shippedModels();
    const problems = Object.keys(committed)
        .filter((name) => !Object.hasOwn(models, name))
        .map((name) => `${name}: a model in the snapshot is no longer shipped`);
    for (const [name, candidate] of Object.entries(models)) {
        const previous = committed[name];
        problems.push(...(previous === undefined ? [] : compareModel(previous, candidate)));
    }
    const current = Object.fromEntries(Object.entries(models).map(([name, { snapshot }]) => [name, snapshot]));
    if (
        problems.length > 0 ||
        canonicalJson(committed as unknown as JsonValue) === canonicalJson(current as unknown as JsonValue)
    ) {
        return problems;
    }
    if (!update) {
        return ['the shipped models changed validly; record them with `check:model-versions --update`'];
    }
    writeFileSync(SNAPSHOT, `${JSON.stringify(current, null, 4)}\n`);
    return [];
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const problems = await checkModelVersions(process.argv.includes('--update'));
    if (problems.length > 0) {
        console.error(problems.join('\n'));
        process.exit(1);
    }
    console.log(`check-model-versions: every shipped model matches ${fileURLToPath(SNAPSHOT)}.`);
}
