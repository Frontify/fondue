/* (c) Copyright Frontify Ltd., all rights reserved. */

// Apart from the editing registry, so rendering, export and plain text never load hotkeys, toolbar or commands.

import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type InlineDefinition,
    type MarkDefinition,
    type RteContent,
    type RtePlugin,
    typesOf,
} from './plugin';
import { PARAGRAPH, paragraphBlock } from './vocabulary';

/** What rendering, export and plain text read from plugins and contents. */
export type ContentRegistry = {
    /** Every block type, the paragraph baseline first. */
    blocks: Map<string, BlockDefinition>;
    inlines: Map<string, InlineDefinition>;
    /** Outermost first (lower `nesting` wraps higher, ties keep plugin order), so engine and renderer nest alike. */
    marks: Map<string, MarkDefinition>;
    /** Carried by every text block (for example, alignment). */
    blockAttributes: Map<string, BlockAttributeDefinition>;
    /** Inferred from `content: { items }`. */
    itemTypeByList: Map<string, string>;
    /** Classes for the element holding the content (the column layout). */
    contentClassNames: readonly string[];
    /** Custom properties set alongside them, later plugins winning. */
    contentProperties: Readonly<Record<string, string>>;
};

/** A bare content has no id, so errors name it by its first type. */
const firstTypeOf = (content: RteContent): string => typesOf(content)[0] ?? 'content';

/** Throws when two plugins declare one type; the same definition twice is fine (two list plugins share their item). */
export const register = <TDefinition>(
    kind: 'block type' | 'mark type' | 'inline type' | 'block attribute' | 'edit view',
    target: Map<string, TDefinition>,
    owners: Map<string, string>,
    owner: string,
    declared: Record<string, TDefinition> | undefined,
): void => {
    for (const [type, definition] of Object.entries(declared ?? {})) {
        const existing = target.get(type);
        if (existing !== undefined && existing !== definition) {
            const first = owners.get(type);
            let message: string;
            if (first === undefined) {
                message = `Duplicate ${kind} "${type}": built into the editor and declared by plugin "${owner}".`;
            } else {
                message = `Duplicate ${kind} "${type}": declared by plugin "${first}" and plugin "${owner}".`;
            }
            throw new Error(message);
        }
        target.set(type, definition);
        if (!owners.has(type)) {
            owners.set(type, owner);
        }
    }
};

/** The type requires an id, but a hand-built plugin can omit it. */
const assertHasId = (plugin: RtePlugin): void => {
    if (typeof plugin.id === 'string' && plugin.id !== '') {
        return;
    }
    const first = typesOf(plugin.content)[0] ?? 'no type declared';
    throw new Error(`Plugin has no id: ${first}`);
};

/** A name no mounted plugin registers is dropped. */
const withMutualExcludes = (marks: Map<string, MarkDefinition>): Map<string, MarkDefinition> => {
    const excluded = new Map<string, Set<string>>();
    for (const [name, mark] of marks) {
        for (const other of mark.excludes ?? []) {
            if (!marks.has(other)) {
                continue;
            }
            excluded.set(name, (excluded.get(name) ?? new Set()).add(other));
            excluded.set(other, (excluded.get(other) ?? new Set()).add(name));
        }
    }
    const folded = new Map<string, MarkDefinition>();
    for (const [name, mark] of marks) {
        const names = excluded.get(name);
        if (mark.excludes === undefined && names === undefined) {
            folded.set(name, mark);
        } else {
            folded.set(name, { ...mark, excludes: [...(names ?? [])] });
        }
    }
    return folded;
};

/** A stable sort, so ties stay in mount order. */
const byNesting = (marks: Map<string, MarkDefinition>): Map<string, MarkDefinition> =>
    new Map([...marks].sort(([, left], [, right]) => (left.nesting ?? 0) - (right.nesting ?? 0)));

type ContentDraft = {
    blocks: Map<string, BlockDefinition>;
    inlines: Map<string, InlineDefinition>;
    marks: Map<string, MarkDefinition>;
    blockAttributes: Map<string, BlockAttributeDefinition>;
    itemTypeByList: Map<string, string>;
    contentClassNames: string[];
    contentProperties: Record<string, string>;
    blockOwners: Map<string, string>;
    inlineOwners: Map<string, string>;
    markOwners: Map<string, string>;
    attributeOwners: Map<string, string>;
};

const addContent = (draft: ContentDraft, content: RteContent | undefined, owner: string): void => {
    if (content?.contentClassName) {
        draft.contentClassNames.push(content.contentClassName);
    }
    Object.assign(draft.contentProperties, content?.contentProperties);

    register('block type', draft.blocks, draft.blockOwners, owner, content?.blocks);
    register('inline type', draft.inlines, draft.inlineOwners, owner, content?.inlines);
    register('mark type', draft.marks, draft.markOwners, owner, content?.marks);
    register('block attribute', draft.blockAttributes, draft.attributeOwners, owner, content?.blockAttributes);
    for (const [type, definition] of Object.entries(content?.blocks ?? {})) {
        if (typeof definition.content === 'object' && 'items' in definition.content) {
            draft.itemTypeByList.set(type, definition.content.items);
        }
    }
};

/** Reads only each entry's content, never a plugin's editing parts. */
export const buildContentRegistry = (entries: readonly (RtePlugin | RteContent)[]): ContentRegistry => {
    const draft: ContentDraft = {
        blocks: new Map<string, BlockDefinition>([[PARAGRAPH, paragraphBlock]]),
        inlines: new Map(),
        marks: new Map(),
        blockAttributes: new Map(),
        itemTypeByList: new Map(),
        contentClassNames: [],
        contentProperties: {},
        blockOwners: new Map(),
        inlineOwners: new Map(),
        markOwners: new Map(),
        attributeOwners: new Map(),
    };

    for (const entry of entries) {
        switch (entry.kind) {
            case 'content':
                addContent(draft, entry, firstTypeOf(entry));
                break;
            case 'plugin':
                assertHasId(entry);
                addContent(draft, entry.content, entry.id);
                break;
            // Only an untyped caller gets here: every typed entry is one of the two kinds above.
            default:
                throw new Error(
                    `Unknown entry kind ${JSON.stringify((entry as { kind?: unknown }).kind)}: build a plugin with \`definePlugin\` and a content with \`defineContent\`.`,
                );
        }
    }

    return {
        blocks: draft.blocks,
        inlines: draft.inlines,
        marks: byNesting(withMutualExcludes(draft.marks)),
        blockAttributes: draft.blockAttributes,
        itemTypeByList: draft.itemTypeByList,
        contentClassNames: draft.contentClassNames,
        contentProperties: draft.contentProperties,
    };
};

/** The declared `defaults` fill the attributes missing from `stored` (the document node or the engine's node). */
export const blockValueOf = (definition: BlockDefinition, stored: Record<string, unknown>): Record<string, unknown> => {
    const defaults = definition.defaults ?? {};
    return Object.fromEntries(Object.entries(defaults).map(([name, fallback]) => [name, stored[name] ?? fallback]));
};

export const blockAttributeStyle = (registry: ContentRegistry, stored: Record<string, unknown>): StyleMap => {
    const style: StyleMap = {};
    for (const [name, attribute] of registry.blockAttributes) {
        const value = stored[name];
        if (typeof value === 'string' && value !== '') {
            Object.assign(style, attribute.style(value));
        }
    }
    return style;
};

/**
 * Applies the block attributes (for example, alignment) to a text block's outermost element, so editor,
 * readonly view and export agree.
 */
export const blockHtml = (
    registry: ContentRegistry,
    definition: BlockDefinition,
    stored: Record<string, unknown>,
): HtmlSpec => {
    const spec = definition.toHtml(blockValueOf(definition, stored));
    if (definition.content !== 'text') {
        return spec;
    }
    return withRootStyle(spec, blockAttributeStyle(registry, stored));
};
