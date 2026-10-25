/* (c) Copyright Frontify Ltd., all rights reserved. */

import { attributesOf, type CompiledMark, type CompiledNode } from './compile';
import { checkAttributes } from './contentAttributes';
import { matchEnds, startMatch } from './contentExpression';
import { isGrid } from './contentGrid';
import {
    advance,
    type Attrs,
    type Context,
    isIsland,
    markIslandOf,
    placeIsland,
    type TreeMark,
    type TreeNode,
    vocabularyOf,
    warn,
} from './contentTree';
import { type ContentModel, type JsonValue } from './declarations';
import { pointer } from './errors';
import { type Diagnostic } from './format';
import { canonicalJson } from './hash';
import { isRecord } from './values';

export {
    ISLAND_BLOCK,
    ISLAND_INLINE,
    ISLAND_MARK,
    isIsland,
    type TreeMark,
    type TreeNode,
    type Vocabulary,
    vocabularyOf,
} from './contentTree';

const hasKeys = (record: Attrs, keys: ReadonlySet<string>) => Object.keys(record).every((key) => keys.has(key));
const MARK_KEYS = new Set(['type', 'attrs']);
const NODE_KEYS = new Set(['type', 'attrs', 'content', 'marks']);
const TEXT_KEYS = new Set(['type', 'text', 'marks']);
const isOptional = (record: Attrs, key: string, kind: (value: unknown) => boolean) =>
    !Object.hasOwn(record, key) || kind(record[key]);

type CheckedMark = { readonly mark: TreeMark; readonly declaration?: CompiledMark; readonly path: string };

/** One mark: its shape, type, keys and kinds, then its attributes as `checkAttributes` checks them. */
const checkMark = (context: Context, value: unknown, path: string): CheckedMark => {
    const island = { mark: markIslandOf(value), path };
    if (!isRecord(value) || typeof value.type !== 'string') {
        warn(context, 'format.invalid-structure', path);
        return island;
    }
    const declaration = context.vocabulary.marks.get(value.type);
    if (declaration === undefined) {
        warn(context, 'format.unknown-mark', path);
        return island;
    }
    if (!hasKeys(value, MARK_KEYS) || !isOptional(value, 'attrs', isRecord)) {
        warn(context, 'format.invalid-structure', path);
        return island;
    }
    const { attrs, exactlyOne } = declaration.declaration;
    const values = checkAttributes(context, attrs, exactlyOne, value.attrs as Attrs | undefined, path);
    return values === undefined ? island : { mark: { type: value.type, attrs: values }, declaration, path };
};

const excludes = (mark: CompiledMark, other: string) => (mark.declaration.excludes ?? []).includes(other);
const conflicts = (a: CompiledMark, b: CompiledMark) => a.name === b.name || excludes(a, b.name) || excludes(b, a.name);

/** The marks of an inline node, sorted by rank, or `undefined` when they make the node fail. */
const checkMarks = (
    context: Context,
    node: CompiledNode,
    parent: CompiledNode,
    stored: readonly unknown[],
    path: string,
): readonly TreeMark[] | undefined => {
    const fail = () => {
        warn(context, 'format.invalid-structure', path);
        return undefined;
    };
    if (stored.length === 0) {
        return [];
    }
    const listed = parent.declaration.marks;
    const takesNone = (names: readonly string[] | undefined) => names !== undefined && names.length === 0;
    if (node.declaration.group !== 'inline' || takesNone(node.declaration.marks) || takesNone(listed)) {
        return fail();
    }
    const isListed = (mark: unknown) => isRecord(mark) && typeof mark.type === 'string' && listed?.includes(mark.type);
    if (listed !== undefined && !stored.every(isListed)) {
        return fail();
    }
    const checked = stored.map((mark, index) => checkMark(context, mark, `${path}${pointer('marks', index)}`));
    if (listed !== undefined && checked.some((mark) => mark.declaration === undefined)) {
        return fail();
    }
    const kept: CompiledMark[] = [];
    const marks = checked.map((entry, index): CheckedMark => {
        const { declaration } = entry;
        if (declaration === undefined) {
            return entry;
        }
        if (kept.some((other) => conflicts(other, declaration))) {
            warn(context, 'format.invalid-structure', entry.path);
            return { mark: markIslandOf(stored[index]), path: entry.path };
        }
        kept.push(declaration);
        return entry;
    });
    if (listed !== undefined && marks.some((mark) => mark.declaration === undefined)) {
        return fail();
    }
    const originals = new Set<string>();
    for (const { mark, declaration, path: at } of marks) {
        const original = declaration === undefined ? canonicalJson(mark.attrs.original as JsonValue) : undefined;
        if (original !== undefined && originals.has(original)) {
            warn(context, 'format.invalid-structure', at);
            return undefined;
        }
        if (original !== undefined) {
            originals.add(original);
        }
    }
    const { markOrder } = context.vocabulary;
    const rank = ({ declaration }: CheckedMark) =>
        declaration === undefined ? 0 : (declaration.declaration.rank ?? 0);
    const order = ({ declaration }: CheckedMark) =>
        declaration === undefined ? markOrder.length : markOrder.indexOf(declaration.name);
    return [...marks].sort((a, b) => rank(a) - rank(b) || order(a) - order(b)).map(({ mark }) => mark);
};

type Checked = { readonly ok: true; readonly node: TreeNode } | { readonly ok: false };
const FAILED: Checked = { ok: false };

/** Each child through `checkNode`, then the content expression in child order, then a table's grid. */
const checkChildren = (
    context: Context,
    node: CompiledNode,
    stored: readonly unknown[],
    path: string,
): readonly TreeNode[] | undefined => {
    const { vocabulary } = context;
    const results = stored.map((child, index) =>
        checkNode(context, child, `${path}${pointer('content', index)}`, node),
    );
    let match = startMatch(node.declaration.content);
    const content: TreeNode[] = [];
    for (const [index, result] of results.entries()) {
        if (result.ok) {
            const next = advance(vocabulary, match, result.node.type);
            if (next.states.length > 0) {
                match = next;
                content.push(result.node);
                continue;
            }
            warn(context, 'format.invalid-structure', `${path}${pointer('content', index)}`);
        }
        const placed = placeIsland(vocabulary, match, stored[index]);
        if (placed === undefined) {
            return undefined;
        }
        match = placed.match;
        content.push(placed.node);
    }
    if (!matchEnds(match)) {
        warn(context, 'format.invalid-structure', path);
        return undefined;
    }
    if (node.name === 'table' && !isGrid(content)) {
        warn(context, 'format.invalid-structure', path);
        return undefined;
    }
    return content;
};

/** A node below the root: its shape and type, then its attributes, marks and children; the first failure makes it fail. */
const checkNode = (context: Context, value: unknown, path: string, parent: CompiledNode): Checked => {
    if (context.review.has(path)) {
        return FAILED;
    }
    if (!isRecord(value) || typeof value.type !== 'string') {
        warn(context, 'format.invalid-structure', path);
        return FAILED;
    }
    const node = context.vocabulary.nodes.get(value.type);
    if (node === undefined) {
        warn(context, 'format.unknown-node', path);
        return FAILED;
    }
    const text = node.name === 'text';
    const shaped = text
        ? hasKeys(value, TEXT_KEYS) && typeof value.text === 'string' && value.text !== ''
        : hasKeys(value, NODE_KEYS) &&
          isOptional(value, 'attrs', isRecord) &&
          isOptional(value, 'content', Array.isArray);
    if (!shaped || !isOptional(value, 'marks', Array.isArray)) {
        warn(context, 'format.invalid-structure', path);
        return FAILED;
    }
    const attrs = text
        ? undefined
        : checkAttributes(context, attributesOf(node), node.declaration.exactlyOne, value.attrs as Attrs, path, 'node');
    if (!text && attrs === undefined) {
        return FAILED;
    }
    const marks = checkMarks(context, node, parent, (value.marks as readonly unknown[] | undefined) ?? [], path);
    if (marks === undefined) {
        return FAILED;
    }
    const content = checkChildren(context, node, (value.content as readonly unknown[] | undefined) ?? [], path);
    if (content === undefined) {
        return FAILED;
    }
    const tree = treeNode(
        node.name,
        text ? undefined : attrs,
        content,
        marks,
        text ? (value.text as string) : undefined,
    );
    context.sources.set(tree, value);
    return { ok: true, node: tree };
};

const treeNode = (
    type: string,
    attrs: Attrs | undefined,
    content: readonly TreeNode[],
    marks: readonly TreeMark[],
    text: string | undefined,
): TreeNode => {
    const node: { -readonly [K in keyof TreeNode]: TreeNode[K] } = { type };
    if (text !== undefined) {
        node.text = text;
    }
    if (attrs !== undefined) {
        node.attrs = attrs;
    }
    if (content.length > 0) {
        node.content = content;
    }
    if (marks.length > 0) {
        node.marks = marks;
    }
    return node;
};

/** The root, after `checkEnvelope` accepted its shape: a failing attribute stays in `unknownAttributes`. */
const checkRoot = (context: Context, root: Attrs): TreeNode | undefined => {
    const node = context.vocabulary.nodes.get('doc');
    if (node === undefined) {
        return undefined;
    }
    const attrs = checkAttributes(
        context,
        attributesOf(node),
        node.declaration.exactlyOne,
        root.attrs as Attrs,
        '/content',
        'root',
    );
    const content = checkChildren(context, node, root.content as readonly unknown[], '/content');
    if (attrs === undefined || content === undefined) {
        return undefined;
    }
    const tree = treeNode('doc', attrs, content, [], undefined);
    context.sources.set(tree, root);
    return tree;
};

/**
 * One walk in document order over the nodes outside islands; a node whose declared `nodeId` the walk
 * already kept becomes an island placed as `checkChildren` places one, and the walk skips the rest of that island.
 * `undefined` when the node itself must become an island.
 */
const dedupe = (context: Context, tree: TreeNode, path: string, kept: Set<string>): TreeNode | undefined => {
    const { vocabulary } = context;
    const node = vocabulary.nodes.get(tree.type);
    if (node === undefined || isIsland(tree)) {
        return tree;
    }
    const nodeId = tree.attrs?.nodeId;
    if (Object.hasOwn(attributesOf(node), 'nodeId') && typeof nodeId === 'string') {
        if (kept.has(nodeId)) {
            warn(context, 'format.duplicate-occurrence-id', path);
            return undefined;
        }
        kept.add(nodeId);
    }
    if (tree.content === undefined) {
        return tree;
    }
    let match = startMatch(node.declaration.content);
    let changed = false;
    const content: TreeNode[] = [];
    for (const [index, child] of tree.content.entries()) {
        const checked = dedupe(context, child, `${path}${pointer('content', index)}`, kept);
        if (checked !== undefined) {
            changed ||= checked !== child;
            match = advance(vocabulary, match, checked.type);
            content.push(checked);
            if (match.states.length === 0) {
                return undefined;
            }
            continue;
        }
        const placed = placeIsland(vocabulary, match, context.sources.get(child));
        if (placed === undefined) {
            return undefined;
        }
        changed = true;
        match = placed.match;
        content.push(placed.node);
    }
    if (!matchEnds(match)) {
        return undefined;
    }
    if (!changed) {
        return tree;
    }
    const next = { ...tree, content };
    context.sources.set(next, context.sources.get(tree));
    return next;
};

/**
 * `checkRoot`, then `dedupe`, over an envelope's root that has the root shape: the island tree and the
 * diagnostics in the order found, or `undefined` when the root itself fails, which only a model whose `doc`
 * content takes no island at some position allows.
 */
export const checkContent = (
    root: unknown,
    model: ContentModel,
    review: ReadonlySet<string> = new Set(),
): { readonly tree: TreeNode | undefined; readonly diagnostics: readonly Diagnostic[] } => {
    const context: Context = { vocabulary: vocabularyOf(model), diagnostics: [], sources: new WeakMap(), review };
    const checked = checkRoot(context, root as Attrs);
    const tree = checked === undefined ? undefined : dedupe(context, checked, '/content', new Set());
    return { tree, diagnostics: context.diagnostics };
};
