/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type MarkType, type Node, type NodeType, type Schema } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { Mapping } from 'prosemirror-transform';

import { exceededWrite } from '#/clipboard/import/limits';
import { refusedNames } from '#/clipboard/import/policy';
import { COMMAND_META, type CommandContext, type CommandLookup, type EngineCommand, withNodeIds } from '#/definition';
import {
    type AttributeDeclaration,
    checkHref,
    type ContentModel,
    type ContentNodeJSON,
    defaultLimits,
    type JsonObject,
    type PayloadDeclaration,
    type ResourceLimits,
} from '#/model';
import { hasNodeId } from '#/model/capabilities';
import { attributesOf, compiledModel } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { hrefPolicyOf } from '#/model/href';
import { randomId } from '#/model/random-id';
import { findInvalidPayload, findUnsafeJson, isRecord, isValidValue, snapshot } from '#/model/values';

import {
    type CapabilityImplementation,
    clearBlocks,
    EDITS,
    LAST_MARK_META,
    placeBlock,
    placesBlock,
} from './capabilities';
import {
    type AncestorValue,
    type BlockValue,
    type CommandOutcome,
    type DocumentApi,
    type EditorRange,
    type SelectionValue,
    type WriteOutcome,
    type WriteTarget,
} from './document-api';
import { canRedo, canUndo } from './history';
import { enterItem, listAround, outdentAtStart } from './lists';
import { markRunAt, markRunAtPos } from './mark-runs';
import { nodeStateChanges, nodeStateOf, withNodeState } from './node-state';
import { inCodeTextblock, nearest as nearestNode, positionOf } from './positions';
import { type EditorRuntime, summarize } from './runtime';
import { appendSteps, carrySelection } from './transactions';
import {
    type AuthoringPolicy,
    type CaptureTargetOptions,
    type CommandOptions,
    type CommandResult,
    type CommandState,
    type SelectionHandle,
} from './types';

export { type CommandContext } from '#/definition';

interface Positions {
    readonly from: number;
    readonly to: number;
}

const RANGES = new WeakMap<object, Positions & { readonly doc: Node }>();

/** The range from `from` to `to` in `doc`. */
export const rangeOf = (doc: Node, from: number, to: number): EditorRange => {
    const range = Object.freeze({});
    RANGES.set(range, { from, to, doc });
    return range as unknown as EditorRange;
};

/** The document positions behind a range this module made, as they were when it was read. */
export const positionsOf = (range: EditorRange): Positions | undefined => RANGES.get(range);

/** The positions of `range` in `doc`, the document it was read from, else `undefined`. */
const positionsIn = (range: EditorRange, doc: Node): Positions | undefined => {
    const read = RANGES.get(range);
    if (read === undefined || read.doc !== doc) {
        return undefined;
    }
    return read;
};

/** Where the document API reads and writes: a running command's state, or the live session. */
interface ApiSource {
    readonly model: ContentModel;
    readonly schema: Schema;
    readonly lookup: CommandLookup;
    readonly limits: ResourceLimits;
    state(): EditorState;
    /** The positions of `range` in the current state, or `undefined` for a range it cannot map from. */
    resolve(range: EditorRange): Positions | undefined;
    /** Runs `command` with `payload` as one edit. */
    edit(command: EngineCommand, payload?: unknown): CommandOutcome;
    /** Why the session's policy or limits refuse `transaction` from `before`, a write checked before it runs. */
    refusal(before: Node, transaction: Transaction): 'policy' | 'limit' | undefined;
    /** Notes a write refused as not allowed, which makes a running command that then fails report `not-allowed`. */
    refused(): void;
    execute(id: string, payload: unknown, options: CommandOptions | undefined): CommandOutcome;
    query(id: string, payload: unknown, options: CommandOptions | undefined): CommandState;
    capture(range: EditorRange | undefined, options: CaptureTargetOptions): SelectionHandle | undefined;
    release(target: SelectionHandle): void;
    select(transaction: Transaction, scroll: boolean): boolean;
    policy(): AuthoringPolicy;
    editable(): boolean;
    /** The position of a surface element, which only the live session has. */
    positionAt(element: Element): number | undefined;
}

const NO_OPTIONS: CaptureTargetOptions = {
    purpose: 'format',
    onIntersectingEdit: 'map',
};

const valuesOf = (attrs: Readonly<Record<string, unknown>>): JsonObject => snapshot({ ...attrs }) as JsonObject;

const idOf = (node: Node): string | null => {
    if (typeof node.attrs.nodeId === 'string') {
        return node.attrs.nodeId;
    }
    return null;
};

/** The stretch that `transaction`'s first step wrote, mapped through its later steps. */
const firstWrite = (transaction: Transaction): Positions => {
    let from = 0;
    let to = 0;
    // oxlint-disable-next-line unicorn/no-array-for-each -- a step map gives its ranges only through `forEach`.
    transaction.mapping.maps[0]?.forEach((_oldStart, _oldEnd, start, end) => {
        from = start;
        to = end;
    });
    const rest = transaction.mapping.slice(1);
    return { from: rest.map(from, 1), to: rest.map(to, -1) };
};

/** The URL policy of the feature that installs a node or mark. */
const policyOf = (model: ContentModel, featureId: string) => {
    const options = compiledModel(model).features.find(({ id }) => id === featureId)?.options;
    return options === undefined ? undefined : hrefPolicyOf(options);
};

/** Whether `value` holds a string longer than `max`, as decode counts `maxAttributeLength`. */
const tooLong = (value: unknown, max: number): boolean => {
    if (typeof value === 'string') {
        return value.length > max;
    }
    return Array.isArray(value) && value.some((item) => tooLong(item, max));
};

/** The URL policy's verdict on `value` of `declaration` in `featureId`, or `undefined` when it is no URL. */
const checkedUrl = (
    model: ContentModel,
    featureId: string,
    declaration: AttributeDeclaration,
    value: unknown,
): ReturnType<typeof checkHref> | undefined => {
    if (declaration.type !== 'url' || typeof value !== 'string') {
        return undefined;
    }
    return checkHref(value, policyOf(model, featureId));
};

/** Whether a `url` value of `attrs` fails the policy of `featureId`. */
const urlRefused = (
    model: ContentModel,
    featureId: string,
    declared: Readonly<Record<string, AttributeDeclaration>>,
    attrs: Readonly<Record<string, unknown>>,
): boolean =>
    Object.entries(declared).some(
        ([name, declaration]) => checkedUrl(model, featureId, declaration, attrs[name])?.ok === false,
    );

interface AttributeOwner {
    readonly attrs: Readonly<Record<string, AttributeDeclaration>>;
    readonly exactlyOne: readonly string[] | undefined;
    readonly featureId: string;
}

/**
 * `attrs` as decode checks them on every one of `types`: each declared and valid there, no string but an `href` longer than
 * `maxLength`, every `url` value in the form `checkHref` stores after its feature's policy, and `exactlyOne` held. With
 * `whole`, they are the attributes of a new mark or node, so each attribute without a default must be among them.
 * `undefined` when one is not.
 */
const checkedAttrs = (
    model: ContentModel,
    types: readonly string[],
    attrs: JsonObject,
    maxLength: number,
    whole: boolean,
): JsonObject | undefined => {
    const { marks, nodes } = compiledModel(model);
    const owners = types.flatMap((name): AttributeOwner[] => {
        const mark = marks.find((candidate) => candidate.name === name);
        if (mark !== undefined) {
            const { declaration } = mark;
            return [
                {
                    attrs: declaration.attrs,
                    exactlyOne: declaration.exactlyOne,
                    featureId: mark.featureId,
                },
            ];
        }
        const node = nodes.find((candidate) => candidate.name === name);
        if (node === undefined) {
            return [];
        }
        return [
            {
                attrs: attributesOf(node),
                exactlyOne: node.declaration.exactlyOne,
                featureId: node.featureId,
            },
        ];
    });
    if (owners.length === 0 || Object.hasOwn(attrs, 'nodeId')) {
        return undefined;
    }
    const checked: Record<string, unknown> = {};
    for (const owner of owners) {
        const values: Record<string, unknown> = {};
        for (const [name, value] of Object.entries(attrs)) {
            const declaration = owner.attrs[name];
            // A type that does not declare an attribute skips it; `checked` below refuses one that none declares.
            if (declaration === undefined) {
                continue;
            }
            // Decode exempts `href` from the length limit: the URL check bounds it.
            if (!isValidValue(declaration, value) || (name !== 'href' && tooLong(value, maxLength))) {
                return undefined;
            }
            values[name] = value;
            const url = checkedUrl(model, owner.featureId, declaration, value);
            if (url !== undefined) {
                if (!url.ok) {
                    return undefined;
                }
                values[name] = url.href;
            }
            checked[name] = values[name];
        }
        for (const [name, declaration] of Object.entries(owner.attrs)) {
            // The runtime gives a new node its `nodeId` before a commit publishes it.
            if (!whole || name === 'nodeId' || Object.hasOwn(values, name)) {
                continue;
            }
            if (!('default' in declaration)) {
                return undefined;
            }
            values[name] = declaration.default;
        }
        const group = owner.exactlyOne ?? [];
        const set = group.filter((name) => values[name] !== null && values[name] !== undefined);
        if (group.some((name) => Object.hasOwn(values, name)) && set.length !== 1) {
            return undefined;
        }
    }
    if (Object.keys(attrs).some((name) => !Object.hasOwn(checked, name))) {
        return undefined;
    }
    return checked as JsonObject;
};

const documentApi = (source: ApiSource): DocumentApi => {
    const { schema, lookup, model, limits } = source;
    const { maxAttributeLength } = limits;
    /** Runs `command` as one edit, refused where it would drop content its target cannot hold, as `execute` refuses it. */
    const edit = (command: EngineCommand, payload?: unknown) => {
        if (command.refuses?.(source.state(), payload) === true) {
            source.refused();
            return false;
        }
        return source.edit(command, payload).status !== 'rejected';
    };
    /** A rejected write, noted as a refusal when a policy or a limit caused it. */
    const rejectedWrite = (code: string): WriteOutcome => {
        if (code === 'policy' || code === 'limit') {
            source.refused();
        }
        return { status: 'rejected', code };
    };
    const capability = (implementation: CapabilityImplementation, args: JsonObject) =>
        implementation(args, schema, lookup);
    /**
     * Runs `implementation` with `args` and the checked `attrs` as its payload, or refuses attributes the types do not take;
     * `whole` attributes make a new mark or node.
     */
    const editWith = (
        implementation: CapabilityImplementation,
        args: JsonObject,
        types: readonly string[],
        attrs: JsonObject | undefined,
        whole: boolean,
        extra: JsonObject = {},
    ) => {
        const checked = checkedAttrs(model, types, attrs ?? {}, maxAttributeLength, whole);
        return checked !== undefined && edit(capability(implementation, args), Object.assign({ ...checked }, extra));
    };
    /** The span of `target` in the current state; with `point`, where an insert goes. */
    const spanOf = (target: WriteTarget, point: boolean): Positions | undefined => {
        if (!('nodeId' in target)) {
            const range = source.resolve(target);
            if (range === undefined || !point) {
                return range;
            }
            return { from: range.to, to: range.to };
        }
        const { doc } = source.state();
        const pos = positionOf(doc, target.nodeId);
        const node = pos === undefined ? null : doc.nodeAt(pos);
        if (pos === undefined || node === null) {
            return undefined;
        }
        const end = pos + node.nodeSize;
        if (target.at === 'before') {
            return { from: pos, to: pos };
        }
        if (target.at === 'after' || (target.at === undefined && point)) {
            return { from: end, to: end };
        }
        if (target.at === undefined) {
            return { from: pos, to: end };
        }
        if (node.isLeaf) {
            return undefined;
        }
        if (target.at === 'start') {
            return { from: pos + 1, to: pos + 1 };
        }
        return { from: end - 1, to: end - 1 };
    };
    /** `value` with an ID on each node whose type carries one and that has none, which decode requires. */
    const withPlaceholderIds = (value: unknown): unknown => {
        if (!isRecord(value)) {
            return value;
        }
        const node: Record<string, unknown> = { ...value };
        if (Array.isArray(value.content)) {
            node.content = value.content.map(withPlaceholderIds);
        }
        const type = typeof value.type === 'string' ? schema.nodes[value.type] : undefined;
        const attrs = isRecord(value.attrs) ? value.attrs : {};
        if (type !== undefined && hasNodeId(type.spec.attrs ?? {}) && !Object.hasOwn(attrs, 'nodeId')) {
            node.attrs = { ...attrs, nodeId: randomId() };
        }
        return node;
    };
    /** `nodes` as decode reads them, or why it refuses them; inline nodes decode inside a paragraph. */
    const decoded = (nodes: readonly ContentNodeJSON[]): Fragment | 'invalid' | 'limit' => {
        if (nodes.length === 0) {
            return Fragment.empty;
        }
        const inline = nodes.every((node) => isRecord(node) && schema.nodes[String(node.type)]?.isInline === true);
        let content: readonly unknown[] = nodes.map(withPlaceholderIds);
        if (inline) {
            content = [withPlaceholderIds({ type: 'paragraph', content: nodes })];
        }
        const envelope = {
            format: 'frontify.rich-text',
            formatVersion: 1,
            model: model.ref,
            requiredCapabilities: model.capabilities,
            content: { type: 'doc', content },
        };
        const { result, tree } = decodeToTree(envelope, model, { limits });
        if (result.status === 'blocked' && result.reason === 'limit-exceeded') {
            return 'limit';
        }
        // Any diagnostic means decode cleaned the content, which a write refuses.
        if (result.status !== 'editable' || tree === undefined || result.diagnostics.length > 0) {
            return 'invalid';
        }
        const blocks = tree.content ?? [];
        // As in a paste, the runtime gives each written node a new `nodeId`.
        if (inline) {
            return withNodeIds(Fragment.fromJSON(schema, blocks[0]?.content), () => null);
        }
        return withNodeIds(Fragment.fromJSON(schema, blocks), () => null);
    };
    /** Whether `content` holds a node or mark of a feature whose policy refuses its paste. */
    const refusesPaste = (content: Fragment) => {
        const refused = refusedNames(model, source.policy().features);
        let found = false;
        content.descendants((node) => {
            found ||= refused.nodes.has(node.type.name) || node.marks.some(({ type }) => refused.marks.has(type.name));
        });
        return found;
    };
    /** Whether `content` holds a `url` attribute of a node or mark that its feature's policy refuses. */
    const refusesUrl = (content: Fragment) => {
        const { marks, nodes } = compiledModel(model);
        let found = false;
        content.descendants((node) => {
            const owner = nodes.find(({ name }) => name === node.type.name);
            if (owner !== undefined) {
                found ||= urlRefused(model, owner.featureId, attributesOf(owner), node.attrs);
            }
            for (const mark of node.marks) {
                const declared = marks.find(({ name }) => name === mark.type.name);
                if (declared !== undefined) {
                    found ||= urlRefused(model, declared.featureId, declared.declaration.attrs, mark.attrs);
                }
            }
        });
        return found;
    };
    /** Commits `transaction`, whose write covers `written`. */
    const commit = (
        state: EditorState,
        transaction: Transaction,
        written: Positions,
        content: Fragment,
    ): WriteOutcome => {
        if (exceededWrite(transaction.doc, written.from, content, limits) !== undefined) {
            return rejectedWrite('limit');
        }
        const refused = source.refusal(state.doc, transaction);
        if (refused !== undefined) {
            return rejectedWrite(refused);
        }
        const outcome = source.edit({
            run: (_state, dispatch) => {
                dispatch?.(transaction);
                return true;
            },
            active: () => false,
        });
        if (outcome.status === 'rejected') {
            return outcome;
        }
        if (outcome.status === 'no-op') {
            return { status: 'no-op' };
        }
        return {
            status: 'applied',
            range: rangeOf(source.state().doc, written.from, written.to),
        };
    };
    const write = (span: Positions | undefined, nodes: readonly ContentNodeJSON[]): WriteOutcome => {
        if (span === undefined) {
            return { status: 'rejected', code: 'target-invalid' };
        }
        const content = decoded(nodes);
        if (typeof content === 'string') {
            return rejectedWrite(content);
        }
        if (refusesPaste(content) || refusesUrl(content)) {
            return rejectedWrite('policy');
        }
        const state = source.state();
        const $from = state.doc.resolve(span.from);
        const $to = state.doc.resolve(span.to);
        const { parent } = $from;
        // Only a write that fits as given: ProseMirror would close, wrap or drop nodes, or drop marks, to fit it.
        if (
            $from.start() !== $to.start() ||
            !parent.canReplace($from.index(), $to.index(), content) ||
            !content.content.every((node) => !node.isInline || parent.type.allowsMarks(node.marks))
        ) {
            return { status: 'rejected', code: 'invalid' };
        }
        if (span.from === span.to && content.size === 0) {
            return { status: 'no-op' };
        }
        const transaction = state.tr.replaceWith(span.from, span.to, content);
        return commit(state, transaction, { from: span.from, to: span.from + content.size }, content);
    };
    /** A new block of `type` with `attrs`, holding the content it requires. */
    const blockOf = (type: NodeType, attrs: JsonObject): Node | 'invalid' => {
        const checked = checkedAttrs(model, [type.name], attrs, maxAttributeLength, true);
        if (checked === undefined) {
            return 'invalid';
        }
        return type.createAndFill(checked) ?? 'invalid';
    };
    const markType = (mark: string): MarkType | undefined => schema.marks[mark];
    const runValue = (
        doc: Node,
        run: {
            from: number;
            to: number;
            text: string;
            attrs: Readonly<Record<string, unknown>>;
        },
    ) => ({
        attrs: valuesOf(run.attrs),
        text: run.text,
        range: rangeOf(doc, run.from, run.to),
    });
    const blocksOf = (doc: Node, node: string): BlockValue[] => {
        const found: BlockValue[] = [];
        doc.descendants((child, pos) => {
            if (child.type.name !== node) {
                return true;
            }
            const nodeId = typeof child.attrs.nodeId === 'string' ? child.attrs.nodeId : null;
            found.push({
                nodeId,
                attrs: valuesOf(child.attrs),
                text: child.textContent,
                range: rangeOf(doc, pos, pos + child.nodeSize),
            });
            return true;
        });
        return found;
    };
    const selectionOf = (state: EditorState): SelectionValue => {
        const { selection } = state;
        const { $from, $to } = selection;
        const ancestors: AncestorValue[] = [];
        for (let depth = 1; depth <= $from.depth; depth += 1) {
            const node = $from.node(depth);
            ancestors.push({
                type: node.type.name,
                attrs: valuesOf(node.attrs),
                nodeId: idOf(node),
                index: $from.index(depth - 1),
                childCount: node.childCount,
                last: $from.index(depth - 1) === $from.node(depth - 1).childCount - 1,
                empty: node.content.size === 0,
            });
        }
        const before = $from.nodeBefore;
        let nodeBefore: SelectionValue['nodeBefore'] = null;
        if (before !== null) {
            nodeBefore = {
                type: before.type.name,
                attrs: valuesOf(before.attrs),
                nodeId: idOf(before),
            };
        }
        return {
            ...summarize(selection),
            ancestors,
            atStart: $from.parent.isTextblock && $from.parentOffset === 0,
            atEnd: $to.parent.isTextblock && $to.parentOffset === $to.parent.content.size,
            nodeBefore,
            verbatim: inCodeTextblock($from),
        };
    };
    return {
        selection: () => selectionOf(source.state()),
        selectedText: () => {
            const { selection, doc } = source.state();
            if (selection.empty || !selection.$from.sameParent(selection.$to)) {
                return '';
            }
            return doc.textBetween(selection.from, selection.to);
        },
        selectedRange: () => {
            const { selection, doc } = source.state();
            return rangeOf(doc, selection.from, selection.to);
        },
        editable: () => source.editable(),
        optionsOf: (featureId) => compiledModel(source.model).features.find(({ id }) => id === featureId)?.options,
        marks: {
            active: (mark, attrs) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                if (attrs === undefined) {
                    return capability(EDITS.toggleMark, { mark }).active(source.state());
                }
                return capability(EDITS.setMark, { mark }).active(source.state(), attrs);
            },
            attrs: (mark) => {
                const type = markType(mark);
                if (type === undefined) {
                    return undefined;
                }
                const { storedMarks, selection } = source.state();
                const held = type.isInSet(storedMarks ?? selection.$from.marks());
                if (held === undefined) {
                    return undefined;
                }
                return valuesOf(held.attrs);
            },
            installed: () => compiledModel(model).marks.map(({ name }) => name),
            allowed: (mark) => {
                const type = markType(mark);
                if (type === undefined) {
                    return false;
                }
                const { selection, doc } = source.state();
                let text = false;
                let takes = false;
                doc.nodesBetween(selection.from, selection.to, (node, _pos, parent) => {
                    if (node.isText) {
                        text = true;
                        takes ||= parent !== null && parent.type.allowsMarkType(type);
                    }
                });
                if (text) {
                    return takes;
                }
                const { parent } = selection.$from;
                return parent.inlineContent && parent.type.allowsMarkType(type);
            },
            run: (mark, options) => {
                const type = markType(mark);
                if (type === undefined) {
                    return undefined;
                }
                const state = source.state();
                if (options?.at !== undefined) {
                    const pos = source.positionAt(options.at);
                    const run = pos === undefined ? undefined : markRunAtPos(state, pos, type);
                    return run === undefined ? undefined : runValue(state.doc, run);
                }
                const run = markRunAt(state, type);
                if (run === undefined) {
                    return undefined;
                }
                // Without `'touching'`, a caret at the run's trailing edge is outside it, as typing there is.
                const { selection } = state;
                if (options?.extendToMarkRange !== 'touching' && selection.empty && selection.from === run.to) {
                    return undefined;
                }
                return runValue(state.doc, run);
            },
            toggle: (mark, attrs) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                if (attrs === undefined) {
                    return edit(capability(EDITS.toggleMark, { mark }));
                }
                const checked = checkedAttrs(model, [mark], attrs, maxAttributeLength, true);
                return checked !== undefined && edit(capability(EDITS.toggleMark, { mark, attrs: checked }));
            },
            set: (mark, attrs, options) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                const requested = options?.extendToMarkRange;
                const extendToMarkRange = requested ?? false;
                const text = options?.text === undefined ? {} : { text: options.text };
                return editWith(EDITS.setMark, { mark, extendToMarkRange }, [mark], attrs, true, text);
            },
            remove: (marks, options) => {
                const installed = (typeof marks === 'string' ? [marks] : [...marks]).filter(
                    (mark) => markType(mark) !== undefined,
                );
                if (installed.length === 0) {
                    return false;
                }
                const requested = options?.extendToMarkRange;
                const extendToMarkRange = requested ?? false;
                const wholeBlocks = options?.wholeBlocks === true;
                return edit(
                    capability(EDITS.removeMark, {
                        installed,
                        extendToMarkRange,
                        wholeBlocks,
                    }),
                );
            },
            reapply: (names) => edit(capability(EDITS.reapplyMark, { installed: [...names] })),
        },
        blocks: {
            active: (node, attrs) => {
                const type = schema.nodes[node];
                if (type === undefined) {
                    return false;
                }
                if (!type.isTextblock) {
                    return capability(EDITS.wrapIn, { node }).active(source.state(), attrs);
                }
                return capability(EDITS.setBlock, { node }).active(source.state(), attrs);
            },
            list: (node) => blocksOf(source.state().doc, node),
            set: (node, attrs, options) =>
                schema.nodes[node] !== undefined &&
                editWith(EDITS.setBlock, { node, toggle: options?.toggle === true }, [node], attrs, true),
            wrap: (node, attrs) =>
                schema.nodes[node] !== undefined && editWith(EDITS.wrapIn, { node }, [node], attrs, true),
            move: (direction) => {
                let action = 'move-down';
                if (direction === 'up') {
                    action = 'move-up';
                }
                return edit(capability(EDITS.block, { action }));
            },
            indentLines: (direction) => edit(capability(EDITS.indentLines, { direction })),
            clear: (attributes) => {
                if (attributes.includes('nodeId')) {
                    return false;
                }
                return edit(clearBlocks(attributes));
            },
        },
        attributes: {
            set: (nodes, attrs, options) => {
                const node = typeof nodes === 'string' ? nodes : [...nodes];
                let types = typeof nodes === 'string' ? [nodes] : [...nodes];
                if (nodes === 'textblocks') {
                    types = Object.values(schema.nodes)
                        .filter((type) => type.isTextblock)
                        .map(({ name }) => name);
                }
                const nodeId = options?.nodeId === undefined ? {} : { nodeId: options.nodeId };
                const args = { node, toggle: options?.toggle === true };
                return editWith(EDITS.setAttributes, args, types, attrs, false, nodeId);
            },
            active: (nodes, attrs, options) => {
                let node: string | string[] = nodes as string;
                if (typeof nodes !== 'string') {
                    node = [...nodes];
                }
                const payload: Record<string, unknown> = { ...attrs };
                if (options?.nodeId !== undefined) {
                    payload.nodeId = options.nodeId;
                }
                return capability(EDITS.setAttributes, { node }).active(source.state(), payload);
            },
        },
        insert: {
            node: (node, attrs, options) => {
                const type = schema.nodes[node];
                const topLevel = options?.place === 'after-top-level-block';
                if (type === undefined || (!type.isBlock && topLevel)) {
                    return { status: 'rejected', code: 'invalid' };
                }
                const state = source.state();
                if (!type.isBlock) {
                    const checked = checkedAttrs(model, [node], attrs ?? {}, maxAttributeLength, true);
                    const { $from } = state.selection;
                    if (checked === undefined) {
                        return { status: 'rejected', code: 'invalid' };
                    }
                    if (!$from.parent.canReplaceWith($from.index(), $from.index(), type)) {
                        return { status: 'rejected', code: 'not-applicable' };
                    }
                    const inline = type.create(checked);
                    // A node whose `marks` declaration is empty, such as a mention, takes no mark from the text around it.
                    const transaction = state.tr.replaceSelectionWith(inline, type.spec.marks !== '').scrollIntoView();
                    return commit(state, transaction, firstWrite(transaction), Fragment.from(inline));
                }
                const block = blockOf(type, attrs ?? {});
                if (typeof block === 'string') {
                    return rejectedWrite(block);
                }
                const transaction = placeBlock(state, block, topLevel);
                if (transaction === undefined) {
                    return { status: 'rejected', code: 'not-applicable' };
                }
                return commit(state, transaction, firstWrite(transaction), Fragment.from(block));
            },
            allowed: (node, options) => {
                const type = schema.nodes[node];
                if (type === undefined) {
                    return false;
                }
                const state = source.state();
                const topLevel = options?.place === 'after-top-level-block';
                if (type.isBlock) {
                    return placesBlock(state, type, topLevel);
                }
                const { $from } = state.selection;
                return !topLevel && $from.parent.canReplaceWith($from.index(), $from.index(), type);
            },
            text: (text) => edit(capability(EDITS.insertText, {}), { text }),
        },
        lists: {
            active: (list) => listAround(source.state().selection.$from)?.list.type.name === list,
            toggle: (list, item, attrs) =>
                schema.nodes[list] !== undefined &&
                schema.nodes[item] !== undefined &&
                editWith(EDITS.toggleList, { list, item }, [list, item], attrs, false),
            indent: (item) => schema.nodes[item] !== undefined && edit(capability(EDITS.indentItem, { item })),
            outdent: (item, options) => {
                const type = schema.nodes[item];
                if (type === undefined) {
                    return false;
                }
                if (options?.atStart === true && !outdentAtStart(type, source.state())) {
                    return false;
                }
                return edit(capability(EDITS.outdentItem, { item }));
            },
            split: (item) => {
                const type = schema.nodes[item];
                if (type === undefined) {
                    return false;
                }
                const enter = enterItem(type);
                return edit({
                    run: (state, dispatch) => enter(state, dispatch),
                    active: () => false,
                });
            },
        },
        content: {
            read: (range) => {
                const span = spanOf(range, false);
                if (span === undefined) {
                    return undefined;
                }
                const nodes = source.state().doc.slice(span.from, span.to).content.toJSON() as TreeNode[] | null;
                const encoded = encodeTree({ type: 'doc', content: nodes ?? [] }, model).document.content.content;
                return encoded ?? [];
            },
            replace: (range, nodes) => write(spanOf(range, false), nodes),
            delete: (range) => write(spanOf(range, false), []),
            insert: (at, nodes) => write(spanOf(at, true), nodes),
        },
        nearest: (node, within) => {
            const type = schema.nodes[node];
            const state = source.state();
            const found = type === undefined ? undefined : nearestNode(state, type, within);
            if (found === undefined) {
                return undefined;
            }
            const { nodeId } = found.node.attrs;
            return {
                nodeId: typeof nodeId === 'string' ? nodeId : null,
                attrs: valuesOf(found.node.attrs),
                range: rangeOf(state.doc, found.pos, found.pos + found.node.nodeSize),
            };
        },
        select: (target, options) => {
            const state = source.state();
            const { doc } = state;
            let transaction: Transaction | undefined;
            if ('nodeId' in target) {
                const pos = positionOf(doc, target.nodeId);
                const node = pos === undefined ? null : doc.nodeAt(pos);
                if (pos === undefined || node === null) {
                    return false;
                }
                if (target.at === 'node') {
                    transaction = state.tr.setSelection(NodeSelection.create(doc, pos));
                } else {
                    transaction = state.tr.setSelection(TextSelection.near(doc.resolve(pos + 1)));
                }
            } else {
                const range = source.resolve(target);
                if (range === undefined) {
                    return false;
                }
                transaction = state.tr.setSelection(
                    TextSelection.between(doc.resolve(range.from), doc.resolve(range.to)),
                );
            }
            return source.select(transaction, options?.scroll === true);
        },
        commands: {
            execute: (id, payload, options) => source.execute(id, payload, options),
            query: (id, payload, options) => source.query(id, payload, options),
        },
        history: {
            undo: () => edit(capability(EDITS.history, { action: 'undo' })),
            redo: () => edit(capability(EDITS.history, { action: 'redo' })),
            canUndo: () => canUndo(source.state()),
            canRedo: () => canRedo(source.state()),
        },
        targets: {
            capture: (range, options) => source.capture(range, options ?? NO_OPTIONS),
            release: (target) => source.release(target),
        },
        nodeState: {
            get: (nodeId, key) => nodeStateOf(source.state(), nodeId, key),
            set: (nodeId, key, value) => {
                source.edit({
                    run: (state, dispatch) => {
                        dispatch?.(withNodeState(state.tr, [{ nodeId, key, value }]));
                        return true;
                    },
                    active: () => false,
                });
            },
        },
    };
};

/** What a command's result says to plugin code: its status, and the code of a refusal. */
const outcomeOf = (result: CommandResult): CommandOutcome => {
    if (result.status === 'rejected') {
        return { status: 'rejected', code: result.code };
    }
    return { status: result.status };
};

/** The document API over the live session, whose writes each commit as one undo step. */
export const liveDocumentApi = (runtime: EditorRuntime): DocumentApi => {
    const { definition } = runtime;
    return documentApi({
        model: definition.model,
        schema: definition.schema,
        lookup: (id) => definition.commands.get(id),
        limits: runtime.limits,
        state: () => runtime.state,
        resolve: (range) => positionsIn(range, runtime.state.doc),
        // A command origin makes each write its own undo step, apart from the typing before it.
        edit: (command, payload) =>
            outcomeOf(
                runtime.perform({
                    run: (state, dispatch) =>
                        command.run(
                            state,
                            (transaction) => dispatch?.(transaction.setMeta(COMMAND_META, null)),
                            payload,
                        ),
                    active: () => false,
                }),
            ),
        refusal: (before, transaction) => runtime.writeRefusal(before, transaction),
        refused: () => undefined,
        execute: (id, payload, options) => runtime.handle.execute(id, payload, options),
        query: (id, payload, options) => runtime.handle.query(id, payload, options),
        capture: (range, options) => {
            if (range === undefined) {
                const captured = runtime.handle.captureTarget(options);
                return captured.status === 'captured' ? captured.target : undefined;
            }
            const positions = positionsIn(range, runtime.state.doc);
            if (positions === undefined) {
                return undefined;
            }
            const captured = runtime.captureRange(positions, options);
            return captured.status === 'captured' ? captured.target : undefined;
        },
        release: (target) => runtime.handle.releaseTarget(target),
        select: (transaction, scroll) => {
            const { selection } = transaction;
            if (selection instanceof NodeSelection) {
                runtime.select({ node: selection.from, scroll });
            } else {
                runtime.select({
                    anchor: selection.anchor,
                    head: selection.head,
                    scroll,
                });
            }
            return true;
        },
        policy: () => runtime.policy,
        editable: () => {
            const { phase, mode } = runtime.handle.getSummary();
            return phase === 'ready' && mode === 'editable';
        },
        positionAt: (element) => {
            const { view } = runtime;
            if (view === undefined || !view.dom.contains(element)) {
                return undefined;
            }
            return view.posAtDOM(element, 0);
        },
    });
};

/** Builds one transaction from the edits of a command, so the command stays one undo step. */
const composer = (base: EditorState) => {
    let current = base;
    let first: Transaction | undefined;
    let outer: Transaction | undefined;
    const mapping = new Mapping();
    // Each document the command has seen, with the index of the first step made after it.
    const seen = new Map<Node, number>([[base.doc, 0]]);
    const take = (next: Transaction) => {
        if (first === undefined) {
            first = next;
        } else {
            if (outer === undefined) {
                outer = base.tr;
                appendSteps(outer, first);
                carryState(outer, first);
            }
            appendSteps(outer, next);
            carryState(outer, next);
        }
        mapping.appendMapping(next.mapping);
        current = current.apply(next);
        if (!seen.has(current.doc)) {
            seen.set(current.doc, mapping.maps.length);
        }
    };
    return {
        state: () => current,
        /** `range` mapped through the steps made since it was read, or `undefined` when it was read before the command. */
        resolve: (range: EditorRange): Positions | undefined => {
            const read = RANGES.get(range);
            const start = read === undefined ? undefined : seen.get(read.doc);
            if (read === undefined || start === undefined) {
                return undefined;
            }
            const since = mapping.slice(start);
            const from = since.map(read.from, 1);
            return { from, to: Math.max(from, since.map(read.to, -1)) };
        },
        apply: (command: EngineCommand, payload?: unknown, context?: CommandContext) => {
            let built: Transaction | undefined;
            const applied = command.run(
                current,
                (transaction) => {
                    built = transaction;
                },
                payload,
                context,
            );
            if (applied && built !== undefined) {
                take(built);
            }
            return applied;
        },
        select: (transaction: Transaction) => take(transaction),
        finish: (): Transaction | undefined => {
            if (outer === undefined) {
                return first;
            }
            return outer.setSelection(carrySelection(outer.doc, current.selection));
        },
    };
};

/** What one edit of a composed command leaves besides its steps: stored marks, scrolling and the last mark it set. */
const carryState = (outer: Transaction, next: Transaction) => {
    if (next.storedMarksSet) {
        outer.setStoredMarks(next.storedMarks);
    }
    if (next.scrolledIntoView) {
        outer.scrollIntoView();
    }
    const mark: unknown = next.getMeta(LAST_MARK_META);
    if (mark !== undefined) {
        outer.setMeta(LAST_MARK_META, mark);
    }
    const flags = nodeStateChanges(next);
    if (flags.length > 0) {
        withNodeState(outer, flags);
    }
};

/** The session a plugin command runs in, as the runtime hands it over in `CommandContext.session`. */
export interface CommandSession {
    readonly runtime: EditorRuntime;
    readonly host: unknown;
}

const sessionOf = (context: CommandContext | undefined): CommandSession | undefined => {
    const session = context?.session;
    if (!isRecord(session) || !('runtime' in session)) {
        return undefined;
    }
    return session as unknown as CommandSession;
};

const NOT_APPLICABLE: CommandOutcome = {
    status: 'rejected',
    code: 'not-applicable',
};

/** A payload as `execute` checks it: plain JSON, valid for its declaration, its `url` fields through the feature's policy. */
const checkedPayload = (
    command: EngineCommand,
    given: unknown,
    model: ContentModel,
): { payload: unknown } | undefined => {
    if (given !== undefined && findUnsafeJson(given, '') !== undefined) {
        return undefined;
    }
    const payload: unknown = snapshot(given);
    if (findInvalidPayload(command.payload, payload) !== undefined) {
        return undefined;
    }
    if (command.payload === undefined || !isRecord(payload)) {
        return { payload };
    }
    const policy = command.featureId === undefined ? undefined : policyOf(model, command.featureId);
    const checked: Record<string, unknown> = { ...payload };
    for (const [name, field] of Object.entries(command.payload.fields)) {
        const value = payload[name];
        if (field.type === 'url' && typeof value === 'string') {
            const result = checkHref(value, policy);
            if (!result.ok) {
                return undefined;
            }
            checked[name] = result.href;
        }
    }
    return { payload: checked };
};

/** What a query hands a command: the same session, and effects dropped. */
const quietOf = (context: CommandContext | undefined): CommandContext => ({
    defer: () => undefined,
    session: context?.session,
});

/** Runs a command with `context` plus a note of any refusal, and says `not-allowed` for a failure that followed one. */
const runNoting = (
    context: CommandContext | undefined,
    run: (noted: CommandContext) => boolean,
): boolean | 'not-allowed' => {
    let refused = false;
    const defer = context?.defer;
    const session = context?.session;
    const applied = run({
        defer: defer ?? (() => undefined),
        session,
        refuse: () => {
            refused = true;
        },
    });
    if (!applied && refused) {
        return 'not-allowed';
    }
    return applied;
};

/**
 * The document API inside a running command: reads see its edits so far, and its edits compose into one step. A
 * command it runs gets `context` and the checks the session runs before a command.
 */
const commandDocumentApi = (
    compose: ReturnType<typeof composer>,
    model: ContentModel,
    schema: Schema,
    lookup: CommandLookup,
    context: CommandContext | undefined,
    session: CommandSession | undefined,
): DocumentApi => {
    let limits = defaultLimits;
    if (session !== undefined) {
        limits = session.runtime.limits;
    }
    return documentApi({
        model,
        schema,
        lookup,
        limits,
        state: compose.state,
        resolve: compose.resolve,
        edit: (command, payload) => {
            if (compose.apply(command, payload)) {
                return { status: 'applied' };
            }
            return NOT_APPLICABLE;
        },
        refusal: (before, transaction) => session?.runtime.writeRefusal(before, transaction),
        refused: () => context?.refuse?.(),
        execute: (id, given) => {
            const command = lookup(id);
            const checked = command === undefined ? undefined : checkedPayload(command, given, model);
            if (command === undefined || checked === undefined) {
                return {
                    status: 'rejected',
                    code: command === undefined ? 'unknown-command' : 'invalid-payload',
                };
            }
            const refused = session?.runtime.refusal(command, compose.state(), checked.payload);
            if (refused !== undefined) {
                return { status: 'rejected', code: refused };
            }
            const applied = runNoting(context, (noted) => compose.apply(command, checked.payload, noted));
            if (applied === 'not-allowed') {
                return { status: 'rejected', code: 'not-allowed' };
            }
            return applied ? { status: 'applied' } : NOT_APPLICABLE;
        },
        query: (id, given) => {
            const command = lookup(id);
            if (command === undefined) {
                return {
                    enabled: false,
                    active: false,
                    disabledReason: 'unknown-command',
                };
            }
            const checked = checkedPayload(command, given, model);
            if (checked === undefined) {
                return {
                    enabled: false,
                    active: false,
                    disabledReason: 'invalid-payload',
                };
            }
            const quiet = quietOf(context);
            const active = command.active(compose.state(), checked.payload, quiet);
            const refused = session?.runtime.refusal(command, compose.state(), checked.payload);
            if (refused !== undefined) {
                return { enabled: false, active, disabledReason: refused };
            }
            const enabled = runNoting(quiet, (noted) =>
                command.run(compose.state(), undefined, checked.payload, noted),
            );
            if (enabled === 'not-allowed') {
                return {
                    enabled: false,
                    active,
                    disabledReason: 'not-allowed',
                };
            }
            return {
                enabled,
                active,
                disabledReason: enabled ? null : 'not-applicable',
            };
        },
        // A capture commits on its own, which a running command cannot.
        capture: () => undefined,
        release: (target) => context?.defer(() => session?.runtime.handle.releaseTarget(target)),
        select: (transaction) => {
            compose.select(transaction);
            return true;
        },
        policy: () =>
            session?.runtime.policy ?? {
                features: {},
                creatableHeadingLevels: [],
            },
        editable: () => session?.runtime.handle.getSummary().mode === 'editable',
        positionAt: () => undefined,
    });
};

/** A plugin command, written over the API it is handed, which runs only through that API. */
export interface PluginCommandSpec<A> {
    readonly payload?: PayloadDeclaration;
    readonly run: (api: A, payload: never) => boolean;
    readonly enabled?: (api: A, payload: never) => boolean;
    readonly active?: (api: A, payload: never) => boolean | 'mixed';
    readonly refuses?: (policy: AuthoringPolicy, payload: never) => boolean;
    readonly readOnly?: boolean;
}

/**
 * The engine command of a plugin command. `extend` adds the session's hosts to the document API, holding their
 * effects until the command has run for real.
 */
export const pluginCommand = <A>(
    spec: PluginCommandSpec<A>,
    model: ContentModel,
    schema: Schema,
    lookup: CommandLookup,
    extend: (api: DocumentApi, context: CommandContext | undefined, session: CommandSession | undefined) => A,
): EngineCommand => {
    // The spec's payload and read-only fields are set only when it declares them.
    const declared: { payload?: PayloadDeclaration; readOnly?: boolean } = {};
    if (spec.payload !== undefined) {
        declared.payload = spec.payload;
    }
    if (spec.readOnly === true) {
        declared.readOnly = true;
    }
    return {
        run: (state, dispatch, given, context) => {
            // A key binding passes `null` for no payload; a query straight on the engine may pass one `execute` never checked.
            const payload = given === null && spec.payload === undefined ? undefined : given;
            if (findInvalidPayload(spec.payload, payload) !== undefined) {
                return false;
            }
            const session = sessionOf(context);
            // `enabled` answers a query, so neither its edits nor its effects reach the run.
            if (spec.enabled !== undefined) {
                const quiet = quietOf(context);
                const probe = extend(
                    commandDocumentApi(composer(state), model, schema, lookup, quiet, session),
                    quiet,
                    session,
                );
                if (!spec.enabled(probe, payload as never)) {
                    return false;
                }
            }
            const compose = composer(state);
            const api = extend(commandDocumentApi(compose, model, schema, lookup, context, session), context, session);
            if (!spec.run(api, payload as never)) {
                return false;
            }
            const transaction = compose.finish();
            if (transaction !== undefined) {
                dispatch?.(transaction);
            }
            return true;
        },
        active: (state, payload, context) => {
            if (spec.active === undefined || findInvalidPayload(spec.payload, payload) !== undefined) {
                return false;
            }
            const session = sessionOf(context);
            return spec.active(
                extend(commandDocumentApi(composer(state), model, schema, lookup, context, session), context, session),
                payload as never,
            );
        },
        policyRefuses: (policy, payload) =>
            spec.refuses !== undefined &&
            findInvalidPayload(spec.payload, payload) === undefined &&
            spec.refuses(policy as AuthoringPolicy, payload as never),
        ...declared,
        viaExecute: true,
    };
};
