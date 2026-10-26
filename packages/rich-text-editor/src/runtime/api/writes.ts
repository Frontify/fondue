/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, type NodeType } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { exceededWrite } from '#/clipboard/import/limits';
import { refusedNames } from '#/clipboard/import/policy';
import { withNodeIds } from '#/definition';
import { type ContentNodeJSON, type JsonObject, isRecord } from '#/model';
import { hasNodeId, attributesOf, compiledModel, decodeToTree, randomId } from '#/model/internal';

import { type WriteOutcome, type WriteTarget } from '../documentApi';
import { positionOf } from '../positions';

import { checkedAttrs, urlRefused } from './checked';
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

/** How `nodes` become content: decode reads them, and the session's paste and URL policies check the result. */
const decodingOf = (source: ApiSource) => {
    const { schema, model, limits } = source;
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

    return { decoded, refusesPaste, refusesUrl };
};

/** The writes of the document API: a target's span, a block to insert, and a write that commits as one edit. */
export const writesOf = (source: ApiSource) => {
    const { model, limits } = source;
    const { maxAttributeLength } = limits;
    const { decoded, refusesPaste, refusesUrl } = decodingOf(source);
    /** A rejected write, noted as a refusal when a policy or a limit caused it. */
    const rejectedWrite = (code: string): WriteOutcome => {
        if (code === 'policy' || code === 'limit') {
            source.refused();
        }

        return { status: 'rejected', code };
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

    /** Commits `transaction`, whose write of `content` covers `written`, unless a limit or the session refuses it. */
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

    /** A new block of `type` with `attrs`, holding the stored JSON `content` as it is, else the content it requires. */
    const blockOf = (
        type: NodeType,
        attrs: JsonObject,
        content: readonly ContentNodeJSON[] | undefined,
    ): Node | 'invalid' | 'limit' | 'policy' => {
        const checked = checkedAttrs(model, [type.name], attrs, maxAttributeLength, true);
        if (checked === undefined) {
            return 'invalid';
        }

        if (content === undefined) {
            return type.createAndFill(checked) ?? 'invalid';
        }

        const built = decoded([{ type: type.name, attrs: checked, content }]);
        if (typeof built === 'string') {
            return built;
        }

        if (refusesUrl(built)) {
            return 'policy';
        }

        return built.firstChild ?? 'invalid';
    };

    return { rejectedWrite, spanOf, commit, write, blockOf };
};
