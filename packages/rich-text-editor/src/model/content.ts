/* (c) Copyright Frontify Ltd., all rights reserved. */

import { attributesOf, type CompiledMark, compiledModel, type CompiledNode } from './compile';
import { advanceMatch, type ContentMatch, matchEnds, startMatch } from './content-expression';
import { type AttributeDeclaration, type ContentModel, type JsonValue } from './declarations';
import { pointer } from './errors';
import { type Diagnostic, diagnostic, type FormatDiagnosticCode } from './format';
import { canonicalJson } from './hash';
import { checkHref } from './href';
import { isRecord, isValidValue } from './values';

export const ISLAND_BLOCK = 'unsupported_block';
export const ISLAND_INLINE = 'unsupported_inline';
export const ISLAND_MARK = 'unsupported_mark';

type Attrs = Readonly<Record<string, unknown>>;
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

interface Context {
    readonly vocabulary: Vocabulary;
    readonly diagnostics: Diagnostic[];
    /** The stored JSON of each tree node, for the island that may replace it. */
    readonly sources: WeakMap<TreeNode, unknown>;
    /** Node positions a `requires-review` migration step reported, which fail unchecked and with no diagnostic of their own. */
    readonly review: ReadonlySet<string>;
}

const warn = (context: Context, code: FormatDiagnosticCode, path: string) =>
    context.diagnostics.push(diagnostic(code, path));

const islandOf = (type: string, original: unknown): TreeNode => {
    const feature = isRecord(original) && typeof original.type === 'string' ? original.type : null;
    return { type, attrs: { original, feature, unknownAttributes: null } };
};
const markIslandOf = (original: unknown): TreeMark => ({
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

const advance = (vocabulary: Vocabulary, match: ContentMatch, type: string) =>
    advanceMatch(match, (term) => takes(vocabulary, term, type));

/** An island for `original` where the expression accepts one, with the match after it. */
const placeIsland = (vocabulary: Vocabulary, match: ContentMatch, original: unknown) => {
    for (const type of [ISLAND_BLOCK, ISLAND_INLINE]) {
        const next = advance(vocabulary, match, type);
        if (next.states.length > 0) {
            return { match: next, node: islandOf(type, original) };
        }
    }
    return undefined;
};

const attributeFault = (declaration: AttributeDeclaration, value: unknown): FormatDiagnosticCode | undefined => {
    if (declaration.type === 'url' && typeof value === 'string' && !checkHref(value).ok) {
        return 'format.unsafe-url';
    }
    return isValidValue(declaration, value) ? undefined : 'format.invalid-attribute';
};

/**
 * Undeclared names go to `unknownAttributes`, then each declared attribute in declared order, then
 * `exactlyOne`. On the root a failing value also goes to `unknownAttributes` and the checks go on.
 */
const checkAttributes = (
    context: Context,
    declared: Readonly<Record<string, AttributeDeclaration>>,
    exactlyOne: readonly string[] | undefined,
    stored: Attrs | undefined,
    path: string,
    root = false,
): Attrs | undefined => {
    const attrs = stored === undefined ? {} : stored;
    const unknown: Record<string, unknown> = {};
    for (const name of Object.keys(attrs)) {
        if (!Object.hasOwn(declared, name)) {
            unknown[name] = attrs[name];
            warn(context, 'format.unknown-attribute', `${path}${pointer('attrs', name)}`);
        }
    }
    const values: Record<string, unknown> = {};
    for (const [name, declaration] of Object.entries(declared)) {
        const present = Object.hasOwn(attrs, name);
        const fallback = 'default' in declaration ? declaration.default : undefined;
        let fault: FormatDiagnosticCode | undefined = 'format.invalid-attribute';
        if (present) {
            fault = attributeFault(declaration, attrs[name]);
        } else if ('default' in declaration) {
            fault = undefined;
        }
        if (fault === undefined) {
            values[name] = present ? attrs[name] : fallback;
            continue;
        }
        warn(context, fault, `${path}${pointer('attrs', name)}`);
        if (!root) {
            return undefined;
        }
        unknown[name] = attrs[name];
        values[name] = fallback;
    }
    if (exactlyOne !== undefined && exactlyOne.filter((name) => values[name] !== null).length !== 1) {
        warn(context, 'format.invalid-attribute', `${path}/attrs`);
        return undefined;
    }
    values.unknownAttributes = Object.keys(unknown).length > 0 ? unknown : null;
    return values;
};

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

/** The cells of a `table` form a rectangular grid with consistent column widths, as `TableMap` needs. */
const isGrid = (rows: readonly TreeNode[]): boolean => {
    const span = (cell: TreeNode, name: 'colspan' | 'rowspan') => {
        const value = cell.attrs?.[name];
        return typeof value === 'number' ? value : 1;
    };
    const cellsOf = (row: TreeNode | undefined) => (row === undefined ? [] : (row.content ?? []));
    const height = rows.length;
    let width = 0;
    let area = 0;
    /** The columns that cells of earlier rows span into each row. */
    const covered = new Float64Array(height);
    for (const [index, row] of rows.entries()) {
        let rowWidth = covered[index] ?? 0;
        for (const cell of cellsOf(row)) {
            const colspan = span(cell, 'colspan');
            const rowspan = span(cell, 'rowspan');
            rowWidth += colspan;
            area += colspan * rowspan;
            for (let below = index + 1; below < Math.min(index + rowspan, height); below += 1) {
                covered[below] = (covered[below] ?? 0) + colspan;
            }
        }
        width = Math.max(width, rowWidth);
    }
    // A grid with no overlap or gap tiles exactly, which bounds the fill below by the cells' own area.
    if (width === 0 || area !== width * height) {
        return false;
    }
    const filled = new Uint8Array(area);
    const columnWidths = new Float64Array(width).fill(-1);
    let position = 0;
    for (const [index, row] of rows.entries()) {
        for (const cell of cellsOf(row)) {
            while (position < area && filled[position] === 1) {
                position += 1;
            }
            const colspan = span(cell, 'colspan');
            const colwidth = cell.attrs?.colwidth;
            const widths = Array.isArray(colwidth) ? (colwidth as readonly unknown[]) : null;
            if (position >= (index + 1) * width || (widths !== null && widths.length !== colspan)) {
                return false;
            }
            for (let down = 0; down < span(cell, 'rowspan'); down += 1) {
                const start = position + down * width;
                if (index + down >= height || (start % width) + colspan > width) {
                    return false;
                }
                for (let across = 0; across < colspan; across += 1) {
                    const column = (start + across) % width;
                    const columnWidth = widths === null ? 0 : Number(widths[across]);
                    const seen = columnWidths[column] ?? -1;
                    if (filled[start + across] === 1 || (seen !== -1 && seen !== columnWidth)) {
                        return false;
                    }
                    filled[start + across] = 1;
                    columnWidths[column] = columnWidth;
                }
            }
            position += colspan;
        }
        for (; position < (index + 1) * width; position += 1) {
            if (filled[position] !== 1) {
                return false;
            }
        }
    }
    return true;
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
        : checkAttributes(context, attributesOf(node), node.declaration.exactlyOne, value.attrs as Attrs, path);
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
        true,
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
    // `format.capability-undeclared` checks the content outside islands here, after the duplicate walk.
    return { tree, diagnostics: context.diagnostics };
};
