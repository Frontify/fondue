/* (c) Copyright Frontify Ltd., all rights reserved. */

// Apart from the editing registry, so rendering, export and plain text never load hotkeys, toolbar or commands.

import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type GridRole,
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
    /** Carried by every text block (alignment). */
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

/** What each role holds. */
const CONTENT_OF_ROLE: Record<GridRole, 'parts' | 'blocks'> = {
    grid: 'parts',
    row: 'parts',
    slot: 'blocks',
    headerSlot: 'blocks',
};

/** The role a row or a slot must sit in, as one of its `{ parts }`. */
const PARENT_ROLE: Partial<Record<GridRole, GridRole>> = {
    row: 'grid',
    slot: 'row',
    headerSlot: 'row',
};

/** What a grid's and a row's parts must be, as errors name them. */
const PART_NAME: Partial<Record<GridRole, string>> = {
    grid: 'row',
    row: 'slot',
};

const parentRoleOf = (role: GridRole | undefined): GridRole | undefined => {
    if (role === undefined) {
        return undefined;
    }
    return PARENT_ROLE[role];
};

const partNameOf = (role: GridRole | undefined): string | undefined => {
    if (role === undefined) {
        return undefined;
    }
    return PART_NAME[role];
};

const childTypesOf = (content: BlockDefinition['content']): readonly string[] => {
    if (typeof content !== 'object') {
        return [];
    }
    if ('parts' in content) {
        return content.parts;
    }
    if ('blocks' in content) {
        return content.blocks;
    }
    return [content.items];
};

type GridBlock = { type: string; definition: BlockDefinition; owner: string };

const assertGridContent = ({ type, definition, owner }: GridBlock, role: GridRole): void => {
    const expected = CONTENT_OF_ROLE[role];
    const { content } = definition;
    if (typeof content !== 'object' || !(expected in content)) {
        throw new Error(`Plugin "${owner}" makes "${type}" a ${role}, whose content must be \`{ ${expected} }\`.`);
    }
};

/** A grid's parts must be rows and a row's parts slots; a row or a slot sits nowhere else. */
const assertPlacement = (
    { type, definition, owner }: GridBlock,
    child: string,
    childRole: GridRole | undefined,
): void => {
    const role = definition.gridRole;
    const parentRole = parentRoleOf(childRole);
    const partName = partNameOf(role);
    if (partName !== undefined && parentRole !== role) {
        throw new Error(`Plugin "${owner}" makes "${type}" a ${role}, but its part "${child}" is not a ${partName}.`);
    }
    if (parentRole !== undefined && parentRole !== role) {
        throw new Error(
            `Plugin "${owner}" puts "${child}", a ${childRole}, in "${type}", which is not a ${parentRole}.`,
        );
    }
};

/** Every row needs a grid, and every slot a row, that holds it. */
const assertPlaced = (draft: ContentDraft, placed: ReadonlySet<string>): void => {
    for (const [type, definition] of draft.blocks) {
        const parentRole = parentRoleOf(definition.gridRole);
        if (parentRole !== undefined && !placed.has(type)) {
            const owner = draft.blockOwners.get(type) ?? type;
            throw new Error(
                `Plugin "${owner}" makes "${type}" a ${definition.gridRole}, but no ${parentRole} holds it.`,
            );
        }
    }
};

/**
 * Any other grid shape breaks grid editing at the first keystroke, so it is
 * rejected here, where the plugin can be named.
 */
const assertGridShapes = (draft: ContentDraft): void => {
    const placed = new Set<string>();
    for (const [type, definition] of draft.blocks) {
        const block = { type, definition, owner: draft.blockOwners.get(type) ?? type };
        if (definition.gridRole !== undefined) {
            assertGridContent(block, definition.gridRole);
        }
        for (const child of childTypesOf(definition.content)) {
            const childRole = draft.blocks.get(child)?.gridRole;
            assertPlacement(block, child, childRole);
            if (parentRoleOf(childRole) !== undefined) {
                placed.add(child);
            }
        }
    }
    assertPlaced(draft, placed);
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

    assertGridShapes(draft);

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

/** Applies the block attributes to a text block's outermost element, so editor, readonly view and export agree. */
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
