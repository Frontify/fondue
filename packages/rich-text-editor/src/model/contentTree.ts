/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompiledMark, compiledModel, type CompiledNode } from './compile';
import { advanceMatch, type ContentMatch } from './contentExpression';
import { type ContentModel } from './declarations';
import { type Diagnostic, diagnostic, type FormatDiagnosticCode } from './format';
import { isRecord } from './values';

export const ISLAND_BLOCK = 'unsupported_block';
export const ISLAND_INLINE = 'unsupported_inline';
export const ISLAND_MARK = 'unsupported_mark';

export type Attrs = Readonly<Record<string, unknown>>;
/** A mark of the island tree: a known mark with `unknownAttributes`, or an `unsupported_mark` holding its `original`. */
export interface TreeMark {
    readonly type: string;
    readonly attrs: Attrs;
}
/**
 * A node of the island tree: the decoded document with every declared attribute filled, undeclared ones in
 * `unknownAttributes`, and `unsupported_block` and `unsupported_inline` nodes holding `original` and `feature`.
 */
export interface TreeNode {
    readonly type: string;
    readonly attrs?: Attrs;
    readonly content?: readonly TreeNode[];
    readonly marks?: readonly TreeMark[];
    readonly text?: string;
}

export interface Vocabulary {
    readonly nodes: ReadonlyMap<string, CompiledNode>;
    readonly marks: ReadonlyMap<string, CompiledMark>;
    /** Mark names by rank, then declared order. */
    readonly markOrder: readonly string[];
}

const vocabularies = new WeakMap<ContentModel, Vocabulary>();

export const vocabularyOf = (model: ContentModel): Vocabulary => {
    let vocabulary = vocabularies.get(model);
    if (vocabulary === undefined) {
        const compiled = compiledModel(model);
        vocabulary = {
            nodes: new Map(compiled.nodes.map((node) => [node.name, node])),
            marks: new Map(compiled.marks.map((mark) => [mark.name, mark])),
            markOrder: compiled.marks.map(({ name }) => name),
        };
        vocabularies.set(model, vocabulary);
    }
    return vocabulary;
};

export const isIsland = (node: TreeNode) => node.type === ISLAND_BLOCK || node.type === ISLAND_INLINE;

export interface Context {
    readonly vocabulary: Vocabulary;
    readonly diagnostics: Diagnostic[];
    /** The stored JSON of each tree node, for the island that may replace it. */
    readonly sources: WeakMap<TreeNode, unknown>;
    /** Node positions a `requires-review` migration step reported, which fail unchecked and with no diagnostic of their own. */
    readonly review: ReadonlySet<string>;
}

export const warn = (context: Context, code: FormatDiagnosticCode, path: string) =>
    context.diagnostics.push(diagnostic(code, path));

export const islandOf = (type: string, original: unknown): TreeNode => {
    const feature = isRecord(original) && typeof original.type === 'string' ? original.type : null;
    return { type, attrs: { original, feature, unknownAttributes: null } };
};
export const markIslandOf = (original: unknown): TreeMark => ({
    type: ISLAND_MARK,
    attrs: { original, unknownAttributes: null },
});

/** Whether a term of a content expression takes a child of `type`; `block` and `inline` also take their island. */
const takes = (vocabulary: Vocabulary, term: string, type: string): boolean => {
    if (vocabulary.nodes.has(term)) {
        return term === type;
    }
    let group: string | undefined = vocabulary.nodes.get(type)?.declaration.group;
    if (type === ISLAND_BLOCK) {
        group = 'block';
    } else if (type === ISLAND_INLINE) {
        group = 'inline';
    }
    return term === 'section' ? group === 'block' || group === 'section' : term === group;
};

export const advance = (vocabulary: Vocabulary, match: ContentMatch, type: string) =>
    advanceMatch(match, (term) => takes(vocabulary, term, type));

/** An island for `original` where the expression accepts one, with the match after it. */
export const placeIsland = (vocabulary: Vocabulary, match: ContentMatch, original: unknown) => {
    for (const type of [ISLAND_BLOCK, ISLAND_INLINE]) {
        const next = advance(vocabulary, match, type);
        if (next.states.length > 0) {
            return { match: next, node: islandOf(type, original) };
        }
    }
    return undefined;
};
