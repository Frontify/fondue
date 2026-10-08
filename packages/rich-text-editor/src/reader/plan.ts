/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type ContentModel, type HtmlSpec, type JsonObject } from '#/model';
import { compiledModel, type SharedAttribute } from '#/model/compile';
import { ownValue } from '#/model/values';

import { declaredOverrides, type ReaderNodeProps } from './define';

type Override = ComponentType<ReaderNodeProps>;

/** What the reader reads about one node type: its `html` spec, its feature's options and its override. */
export interface NodePlan {
    readonly featureId: string;
    readonly inline: boolean;
    /** `whitespace: 'pre'` keeps every space as written. */
    readonly pre: boolean;
    readonly spec: HtmlSpec;
    readonly shared: readonly SharedAttribute[];
    readonly options: JsonObject;
    readonly override: Override | undefined;
}
export interface MarkPlan {
    readonly featureId: string;
    readonly spec: HtmlSpec;
    readonly options: JsonObject;
    readonly override: Override | undefined;
}
export interface Plan {
    readonly nodes: ReadonlyMap<string, NodePlan>;
    readonly marks: ReadonlyMap<string, MarkPlan>;
}

const plans = new WeakMap<ContentModel, Plan>();

/** The render plan of a compiled model, built once per model. */
export const planOf = (model: ContentModel): Plan => {
    let plan = plans.get(model);
    if (plan === undefined) {
        const compiled = compiledModel(model);
        const features = new Map(compiled.features.map((feature) => [feature.id, feature]));
        const overrideOf = (featureId: string, name: string): Override | undefined => {
            const feature = features.get(featureId);
            if (feature === undefined) {
                return undefined;
            }
            const renderers = declaredOverrides(feature.declaration);
            if (renderers === undefined) {
                return undefined;
            }
            return ownValue(renderers, name);
        };
        const optionsOf = (featureId: string): JsonObject => {
            const feature = features.get(featureId);
            if (feature === undefined) {
                return {};
            }
            return feature.options;
        };
        plan = {
            nodes: new Map(
                compiled.nodes.map(({ name, featureId, declaration, shared }) => [
                    name,
                    {
                        featureId,
                        inline: declaration.group === 'inline',
                        pre: declaration.whitespace === 'pre',
                        spec: declaration.html,
                        shared,
                        options: optionsOf(featureId),
                        override: overrideOf(featureId, name),
                    },
                ]),
            ),
            marks: new Map(
                compiled.marks.map(({ name, featureId, declaration }) => [
                    name,
                    {
                        featureId,
                        spec: declaration.html,
                        options: optionsOf(featureId),
                        override: overrideOf(featureId, name),
                    },
                ]),
            ),
        };
        plans.set(model, plan);
    }
    return plan;
};
