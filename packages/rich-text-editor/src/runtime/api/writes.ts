/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, type NodeType, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { type ContentNodeJSON, type JsonObject, isRecord } from '#/model';
import { hasNodeId, attributesOf, compiledModel, decodeToTree, randomId } from '#/model/internal';
import { withNodeIds } from '#/runtime/definition';
import { exceededWrite } from '#/runtime/import/limits';
import { refusedNames } from '#/runtime/import/policy';

import { positionOf } from '../transform/positions';

import { checkedAttrs, urlRefused } from './checked';
import { type WriteOutcome, type WriteTarget } from './documentApi';
import { type ApiSource, type Positions, rangeOf } from './shared';

/** The stretch that `transaction`'s first step wrote, mapped through its later steps. */
export const firstWrite = (transaction: Transaction): Positions => {
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

/** What decoding written nodes reads from the session. */
type DecodingContext = {
    source: ApiSource;
};

/** `value` with an ID on each node whose type carries one and that has none, which decode requires. */
const withPlaceholderIds = (schema: Schema, value: unknown): unknown => {
    if (!isRecord(value)) {
        return value;
    }

    const node: Record<string, unknown> = { ...value };
    if (Array.isArray(value.content)) {
        node.content = value.content.map((child) => withPlaceholderIds(schema, child));
    }

    let type: NodeType | undefined;
    if (typeof value.type === 'string') {
        type = schema.nodes[value.type];
    }

    let attrs: Record<string, unknown> = {};
    if (isRecord(value.attrs)) {
        attrs = value.attrs;
    }

    if (type !== undefined && hasNodeId(type.spec.attrs ?? {}) && !Object.hasOwn(attrs, 'nodeId')) {
        node.attrs = { ...attrs, nodeId: randomId() };
    }

    return node;
};

/** `nodes` as decode reads them, or why it refuses them; inline nodes decode inside a paragraph. */
const decodedFragment = (
    context: DecodingContext,
    nodes: readonly ContentNodeJSON[],
): Fragment | 'invalid' | 'limit' => {
    const { schema, model, limits } = context.source;
    if (nodes.length === 0) {
        return Fragment.empty;
    }

    const inline = nodes.every((node) => isRecord(node) && schema.nodes[String(node.type)]?.isInline === true);
    let content: readonly unknown[] = nodes.map((node) => withPlaceholderIds(schema, node));
    if (inline) {
        content = [withPlaceholderIds(schema, { type: 'paragraph', content: nodes })];
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
const pasteRefused = (context: DecodingContext, content: Fragment) => {
    const { model } = context.source;
    const refused = refusedNames(model, context.source.policy().features);
    let found = false;
    content.descendants((node) => {
        found ||= refused.nodes.has(node.type.name) || node.marks.some(({ type }) => refused.marks.has(type.name));
    });

    return found;
};

/** Whether `content` holds a `url` attribute of a node or mark that its feature's policy refuses. */
const urlAttrsRefused = (context: DecodingContext, content: Fragment) => {
    const { model } = context.source;
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

/** How `nodes` become content: decode reads them, and the session's paste and URL policies check the result. */
const decodingOf = (source: ApiSource) => {
    const context: DecodingContext = { source };

    return {
        decoded: (nodes: readonly ContentNodeJSON[]) => decodedFragment(context, nodes),
        refusesPaste: (content: Fragment) => pasteRefused(context, content),
        refusesUrl: (content: Fragment) => urlAttrsRefused(context, content),
    };
};

/** A write's source and the decode checks it runs before it commits. */
type WriteContext = {
    source: ApiSource;
    decoded: (nodes: readonly ContentNodeJSON[]) => Fragment | 'invalid' | 'limit';
    refusesPaste: (content: Fragment) => boolean;
    refusesUrl: (content: Fragment) => boolean;
};

/** A rejected write, noted as a refusal when a policy or a limit caused it. */
const rejectWrite = (context: WriteContext, code: string): WriteOutcome => {
    if (code === 'policy' || code === 'limit') {
        context.source.refused();
    }

    return { status: 'rejected', code };
};

/** The span of `target` in the current state; with `point`, where an insert goes. */
const targetSpan = (context: WriteContext, target: WriteTarget, point: boolean): Positions | undefined => {
    if (!('nodeId' in target)) {
        const range = context.source.resolve(target);
        if (range === undefined || !point) {
            return range;
        }

        return { from: range.to, to: range.to };
    }

    const { doc } = context.source.state();
    const pos = positionOf(doc, target.nodeId);
    if (pos === undefined) {
        return undefined;
    }

    const node = doc.nodeAt(pos);
    if (node === null) {
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

/** Commits `transaction`, whose write of `content` covers `written`, unless a limit or the session refuses it. */
const commitFragment = (
    context: WriteContext,
    state: EditorState,
    transaction: Transaction,
    written: Positions,
    content: Fragment,
): WriteOutcome => {
    if (exceededWrite(transaction.doc, written.from, content, context.source.limits) !== undefined) {
        return rejectWrite(context, 'limit');
    }

    const refused = context.source.refusal(state.doc, transaction);
    if (refused !== undefined) {
        return rejectWrite(context, refused);
    }

    const outcome = context.source.edit({
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
        range: rangeOf(context.source.state().doc, written.from, written.to),
    };
};

/** Replaces `span` with `nodes` and commits it, or rejects it unless the nodes fit there as given. */
const replaceSpan = (
    context: WriteContext,
    span: Positions | undefined,
    nodes: readonly ContentNodeJSON[],
): WriteOutcome => {
    if (span === undefined) {
        return { status: 'rejected', code: 'target-invalid' };
    }

    const content = context.decoded(nodes);
    if (typeof content === 'string') {
        return rejectWrite(context, content);
    }

    if (context.refusesPaste(content) || context.refusesUrl(content)) {
        return rejectWrite(context, 'policy');
    }

    const state = context.source.state();
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

    return commitFragment(context, state, transaction, { from: span.from, to: span.from + content.size }, content);
};

/** A new block of `type` with `attrs`, holding the stored JSON `content` as it is, else the content it requires. */
const filledBlock = (
    context: WriteContext,
    type: NodeType,
    attrs: JsonObject,
    content: readonly ContentNodeJSON[] | undefined,
): Node | 'invalid' | 'limit' | 'policy' => {
    const { model, limits } = context.source;
    const checked = checkedAttrs(model, [type.name], attrs, limits.maxAttributeLength, true);
    if (checked === undefined) {
        return 'invalid';
    }

    if (content === undefined) {
        return type.createAndFill(checked) ?? 'invalid';
    }

    const built = context.decoded([{ type: type.name, attrs: checked, content }]);
    if (typeof built === 'string') {
        return built;
    }

    if (context.refusesUrl(built)) {
        return 'policy';
    }

    return built.firstChild ?? 'invalid';
};

/** The writes of the document API: a target's span, a block to insert, and a write that commits as one edit. */
export const writesOf = (source: ApiSource) => {
    const decoding = decodingOf(source);
    const context: WriteContext = { source, ...decoding };

    return {
        rejectedWrite: (code: string) => rejectWrite(context, code),
        spanOf: (target: WriteTarget, point: boolean) => targetSpan(context, target, point),
        commit: (state: EditorState, transaction: Transaction, written: Positions, content: Fragment) =>
            commitFragment(context, state, transaction, written, content),
        write: (span: Positions | undefined, nodes: readonly ContentNodeJSON[]) => replaceSpan(context, span, nodes),
        blockOf: (type: NodeType, attrs: JsonObject, content: readonly ContentNodeJSON[] | undefined) =>
            filledBlock(context, type, attrs, content),
    };
};
