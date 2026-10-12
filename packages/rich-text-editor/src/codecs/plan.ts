/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CodecContext,
    type ContentModel,
    DefinitionError,
    type FeatureFormats,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
} from '#/model';
import { type SharedAttribute } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { canonicalJson } from '#/model/hash';
import { resolveHtmlSpec } from '#/model/html-spec';
import { buildPlan, type MarkPlan as BaseMarkPlan, type NodePlan as BaseNodePlan, type Plan } from '#/model/output';
import { ownValue } from '#/model/values';

import { type CodecLoss } from './types';

export type Format = keyof FeatureFormats;
type Write = (inner: string, attrs: JsonObject, context: CodecContext) => string;

/** What every codec reads about one node type: the shared plan and its overrides. */
export interface NodePlan extends BaseNodePlan {
    readonly html: ((attrs: JsonObject, context: CodecContext) => HtmlSpec) | undefined;
    readonly markdown: Write | undefined;
    readonly text: Write | undefined;
}
export interface MarkPlan extends BaseMarkPlan {
    readonly markdown: Write | undefined;
    readonly text: ((inner: string, attrs: JsonObject) => string) | undefined;
}
export type CodecPlan = Plan<NodePlan, MarkPlan>;

/** The vocabulary nodes Markdown writes by name. */
export const MARKDOWN_NODES = new Set(
    'doc paragraph text hard_break heading blockquote bullet_list ordered_list list_item task_list task_item code_block horizontal_rule column_break table table_row table_cell table_header figure asset_image embed mention'.split(
        ' ',
    ),
);
/** The leaf nodes plain text writes by name; every other node writes its content's text. */
export const TEXT_LEAVES = new Set('text hard_break mention asset_image embed horizontal_rule column_break'.split(' '));

/** Whether the package can write `format` for a node without an override. */
const derives: Readonly<Record<Format, (node: NodePlan) => boolean>> = {
    html: (node) => node.leaf || resolveHtmlSpec(node.spec, {}, node.options).content,
    text: (node) => !node.leaf || TEXT_LEAVES.has(node.name),
    markdown: (node) => !node.leaf || MARKDOWN_NODES.has(node.name) || node.form !== undefined,
};
const overridden = (node: NodePlan, format: Format) => node[format] !== undefined;

const overrideOf = <V>(overrides: Readonly<Record<string, V>> | undefined, name: string): V | undefined => {
    if (overrides === undefined) {
        return undefined;
    }
    return ownValue(overrides, name);
};

const plans = new WeakMap<ContentModel, CodecPlan>();

/** The codec plan of a compiled model, built once per model. */
export const planOf = (model: ContentModel): CodecPlan => {
    let plan = plans.get(model);
    if (plan === undefined) {
        plan = buildPlan(
            model,
            ({ codecs = {} }, name) => ({
                html: overrideOf(codecs.html?.nodes, name),
                markdown: overrideOf(codecs.markdown?.nodes, name),
                text: overrideOf(codecs.text?.nodes, name),
            }),
            ({ codecs = {} }, name) => ({
                markdown: overrideOf(codecs.markdown?.marks, name),
                text: overrideOf(codecs.text?.marks, name),
            }),
        );
        plans.set(model, plan);
    }
    return plan;
};

/** Throws `definition.missing-codec` for the first node whose declared format neither the package nor an override writes. */
export const checkCodecs = (plan: CodecPlan): void => {
    for (const node of plan.nodes.values()) {
        for (const format of ['html', 'text', 'markdown'] as const) {
            if (node.formats[format] === 'unsupported' || derives[format](node) || overridden(node, format)) {
                continue;
            }
            throw new DefinitionError('definition.missing-codec', {
                feature: node.featureId,
                format,
                path: pointer('nodes', node.name),
            });
        }
    }
};

/** Counts per feature, in the order each feature was first met. */
export class Losses {
    private readonly counts = new Map<string, number>();

    add(featureId: string): void {
        this.counts.set(featureId, (this.counts.get(featureId) ?? 0) + 1);
    }

    merge(other: Losses): void {
        for (const { featureId, count } of other.list()) {
            this.counts.set(featureId, (this.counts.get(featureId) ?? 0) + count);
        }
    }

    list(): CodecLoss[] {
        return [...this.counts].map(([featureId, count]) => ({ featureId, count }));
    }
}

/** The shared attributes of `node` that hold a value other than their default, which no text or Markdown output writes. */
export const setShared = (plan: NodePlan, node: TreeNode): readonly SharedAttribute[] =>
    plan.shared.filter(({ name, declaration }) => {
        let value: JsonValue = null;
        const stored = node.attrs?.[name];
        if (stored !== undefined) {
            value = stored as JsonValue;
        }
        let fallback: JsonValue = null;
        if ('default' in declaration.value && declaration.value.default !== undefined) {
            fallback = declaration.value.default;
        }
        return canonicalJson(value) !== canonicalJson(fallback);
    });
