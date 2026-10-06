/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import {
    type CapabilityMigration,
    compileContentModel,
    defineFeature,
    type Diagnostic,
    type JsonObject,
    type JsonValue,
    type ModelMigration,
} from '#/model';

/**
 * Stand-ins for a model that changes over three versions, so migrations run before a shipped feature declares
 * one: `fixture.note` renames `tone` to `level` and adds `nodeId` in capability version 2 (a registered step),
 * then adds `collapsed` in version 3 (no step); model version 2 replaces `fixture.divider` with `fixture.rule`
 * (a model step). Never in the registry or a profile.
 */
export const NOTES_ID = 'fixture.notes';

const requires = [{ id: 'core', version: 1 }];
const isObject = (value: unknown): value is JsonObject =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/** Rewrites each node position from the root down; `descend: false` keeps the subtree as it is. */
const rewrite = (
    value: JsonValue,
    path: string,
    visit: (node: JsonObject, path: string) => { readonly node: JsonObject; readonly descend: boolean },
): JsonValue => {
    if (!isObject(value)) {
        return value;
    }
    const { node, descend } = visit(value, path);
    const { content } = node;
    if (!descend || !Array.isArray(content)) {
        return node;
    }
    const children = (content as readonly JsonValue[]).map((child, index) =>
        rewrite(child, `${path}/content/${index}`, visit),
    );
    return { ...node, content: children };
};

/** `info` maps to `info`; `alert` covers both `warning` and `danger`, and a stored `level` competes with `tone`. */
export const toneToLevel: CapabilityMigration = {
    id: 'fixture.note.tone-to-level',
    from: 1,
    migrate: (document, { ids }) => {
        const unmapped: Diagnostic[] = [];
        const content = rewrite(document.content as unknown as JsonValue, '/content', (node, path) => {
            const attrs = node.attrs ?? {};
            if (node.type !== 'note' || !isObject(attrs)) {
                return { node, descend: true };
            }
            const { tone = 'info', ...rest } = attrs;
            if (tone === 'alert' || 'level' in rest) {
                const at = { code: 'migration.requires-review', severity: 'warning', path } as const;
                unmapped.push({ ...at, messageKey: at.code, featureId: 'fixture.note' });
                return { node, descend: false };
            }
            if (tone !== 'info') {
                return { node, descend: true };
            }
            return { node: { ...node, attrs: { nodeId: ids.next('node'), level: 'info', ...rest } }, descend: true };
        });
        const migrated = { ...document, content: content as unknown as typeof document.content };
        return unmapped.length === 0
            ? { status: 'migrated', document: migrated }
            : { status: 'requires-review', document: migrated, diagnostics: unmapped };
    },
};

export const dividerToRule: ModelMigration = {
    id: 'fixture.notes.divider-to-rule',
    from: 1,
    migrate: (document) => {
        const content = rewrite(document.content as unknown as JsonValue, '/content', (node) => ({
            node: node.type === 'divider' ? { ...node, type: 'horizontal_rule' } : node,
            descend: true,
        }));
        const requiredCapabilities = document.requiredCapabilities
            .map((capability) =>
                capability.id === 'fixture.divider' ? { id: 'fixture.rule', version: 1 } : capability,
            )
            .sort((a, b) => (a.id < b.id ? -1 : 1));
        return {
            status: 'migrated',
            document: { ...document, requiredCapabilities, content: content as unknown as typeof document.content },
        };
    },
};

const note = { group: 'block', content: 'paragraph+', html: ['aside', 0], parse: [] } as const;
const level = { type: 'enum', values: ['info', 'warning', 'danger'], default: 'info' } as const;

export const noteV1 = defineFeature({
    id: 'fixture.note',
    version: 1,
    requires,
    nodes: { note: { ...note, attrs: { tone: { type: 'enum', values: ['info', 'alert'], default: 'info' } } } },
});
export const noteV2 = defineFeature({
    id: 'fixture.note',
    version: 2,
    requires,
    migrations: [toneToLevel],
    nodes: { note: { ...note, attrs: { nodeId: { type: 'string', required: true }, level } } },
});
export const noteV3 = defineFeature({
    id: 'fixture.note',
    version: 3,
    requires,
    migrations: [toneToLevel],
    nodes: {
        note: {
            ...note,
            attrs: {
                nodeId: { type: 'string', required: true },
                level,
                collapsed: { type: 'boolean', default: false },
            },
        },
    },
});
export const divider = defineFeature({
    id: 'fixture.divider',
    version: 1,
    requires,
    nodes: { divider: { group: 'block', attrs: {}, html: ['hr'], parse: [] } },
});
export const rule = defineFeature({
    id: 'fixture.rule',
    version: 1,
    requires,
    nodes: { horizontal_rule: { group: 'block', attrs: {}, html: ['hr'], parse: [] } },
});

export type NotesVersion = 1 | 2 | 3;

export const notesModel = (version: NotesVersion) => {
    if (version === 1) {
        return compileContentModel([core(), noteV1(), divider()], { id: NOTES_ID, version });
    }
    const features = [core(), version === 2 ? noteV2() : noteV3(), rule()];
    return compileContentModel(features, { id: NOTES_ID, version, migrations: [dividerToRule] });
};
