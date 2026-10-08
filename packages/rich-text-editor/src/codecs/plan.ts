/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CodecContext,
    type CodecOverrides,
    type ContentModel,
    DefinitionError,
    type FeatureFormats,
    type HtmlSpec,
    type JsonObject,
    type JsonValue,
    type MarkDeclaration,
    type NodeDeclaration,
} from '#/model';
import { compiledModel, type SharedAttribute } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { canonicalJson } from '#/model/hash';
import { resolveHtmlSpec } from '#/model/html-spec';
import { ownValue } from '#/model/values';

import { type CodecLoss } from './types';

export type Format = keyof FeatureFormats;
type Write = (inner: string, attrs: JsonObject, context: CodecContext) => string;

/** What every codec reads about one node type: its specs, Markdown form, overrides and its feature's declared support. */
export interface NodePlan {
    readonly name: string;
    readonly featureId: string;
    readonly inline: boolean;
    /** `whitespace: 'pre'` keeps every space as written. */
    readonly pre: boolean;
    /** Declares no content. */
    readonly leaf: boolean;
    readonly spec: HtmlSpec;
    readonly shared: readonly SharedAttribute[];
    readonly options: JsonObject;
    readonly formats: FeatureFormats;
    readonly form: NodeDeclaration['markdown'];
    readonly html: ((attrs: JsonObject, context: CodecContext) => HtmlSpec) | undefined;
    readonly markdown: Write | undefined;
    readonly text: Write | undefined;
}
export interface MarkPlan {
    readonly name: string;
    readonly featureId: string;
    readonly spec: HtmlSpec;
    readonly options: JsonObject;
    readonly formats: FeatureFormats;
    readonly form: MarkDeclaration['markdown'];
    readonly markdown: Write | undefined;
    readonly text: ((inner: string, attrs: JsonObject) => string) | undefined;
}
export interface CodecPlan {
    readonly nodes: ReadonlyMap<string, NodePlan>;
    readonly marks: ReadonlyMap<string, MarkPlan>;
    /** Every feature's declared support, by feature ID. */
    readonly formats: ReadonlyMap<string, FeatureFormats>;
}

/** A feature that declares no formats claims no text or Markdown support, so each use of it is reported. */
const UNDECLARED: FeatureFormats = { html: 'lossless', text: 'unsupported', markdown: 'unsupported' };

/** The vocabulary nodes the Markdown rules table writes by name. */
export const MARKDOWN_NODES = new Set(
    'doc paragraph text hard_break heading blockquote bullet_list ordered_list list_item task_list task_item code_block horizontal_rule column_break table table_row table_cell table_header figure asset_image embed mention'.split(
        ' ',
    ),
);
/** The leaf nodes the Plain text rules table writes by name; every other node writes its content's text. */
export const TEXT_LEAVES = new Set('text hard_break mention asset_image embed horizontal_rule column_break'.split(' '));

/** Whether the package can write `format` for a node without an override (SPEC-rich-text/AC-024). */
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

const NO_FEATURE: { readonly options: JsonObject; readonly formats: FeatureFormats; readonly codecs: CodecOverrides } =
    {
        options: {},
        formats: UNDECLARED,
        codecs: {},
    };

const plans = new WeakMap<ContentModel, CodecPlan>();

/** The codec plan of a compiled model, built once per model. */
export const planOf = (model: ContentModel): CodecPlan => {
    let plan = plans.get(model);
    if (plan === undefined) {
        const compiled = compiledModel(model);
        const formats = new Map(
            compiled.features.map(({ id, declaration }) => [id, declaration.formats ?? UNDECLARED]),
        );
        const features = new Map(
            compiled.features.map(({ id, declaration, options }) => [
                id,
                { options, formats: declaration.formats ?? UNDECLARED, codecs: declaration.codecs ?? {} },
            ]),
        );
        // Every compiled node and mark names a compiled feature, so the fallback never applies.
        const featureOf = (featureId: string) => features.get(featureId) ?? NO_FEATURE;
        plan = {
            formats,
            nodes: new Map(
                compiled.nodes.map(({ name, featureId, declaration, shared }) => {
                    const { options, formats: support, codecs } = featureOf(featureId);
                    const node: NodePlan = {
                        name,
                        featureId,
                        inline: declaration.group === 'inline',
                        pre: declaration.whitespace === 'pre',
                        leaf: declaration.content === undefined,
                        spec: declaration.html,
                        shared,
                        options,
                        formats: support,
                        form: declaration.markdown,
                        html: overrideOf(codecs.html?.nodes, name),
                        markdown: overrideOf(codecs.markdown?.nodes, name),
                        text: overrideOf(codecs.text?.nodes, name),
                    };
                    return [name, node];
                }),
            ),
            marks: new Map(
                compiled.marks.map(({ name, featureId, declaration }) => {
                    const { options, formats: support, codecs } = featureOf(featureId);
                    const mark: MarkPlan = {
                        name,
                        featureId,
                        spec: declaration.html,
                        options,
                        formats: support,
                        form: declaration.markdown,
                        markdown: overrideOf(codecs.markdown?.marks, name),
                        text: overrideOf(codecs.text?.marks, name),
                    };
                    return [name, mark];
                }),
            ),
        };
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

/** The attributes a codec may read: every declared one, and never `unknownAttributes` (SPEC-rich-text-format/AC-027). */
export const attrsOf = (attrs: TreeNode['attrs']): JsonObject => {
    const known: Record<string, JsonValue> = {};
    for (const [name, value] of Object.entries(attrs ?? {})) {
        if (name !== 'unknownAttributes') {
            known[name] = value as JsonValue;
        }
    }
    return known;
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
