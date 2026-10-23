/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type ContentModel, type FeatureDeclaration } from '#/model';
import { buildPlan, type MarkPlan, type NodePlan, type Plan as BasePlan } from '#/model/output';
import { ownValue } from '#/model/values';

import { declaredOverrides, type ReaderNodeProps, type ReaderRenderers } from './define';

/** What the reader reads about one node or mark type: the shared plan and its override. */
interface Overridden {
    readonly override: ComponentType<ReaderNodeProps> | undefined;
}
export type Plan = BasePlan<NodePlan & Overridden, MarkPlan & Overridden>;

/** Reader overrides by feature ID, for the features whose declaration attaches none. */
export type ReaderOverrides = Readonly<Record<string, ReaderRenderers>>;

const overrideOf =
    (shipped: ReaderOverrides) =>
    (feature: FeatureDeclaration, name: string): Overridden => {
        let renderers = declaredOverrides(feature);
        if (renderers === undefined) {
            renderers = ownValue(shipped, feature.id);
        }
        if (renderers === undefined) {
            return { override: undefined };
        }
        return { override: ownValue(renderers, name) };
    };

const plans = new WeakMap<ReaderOverrides, WeakMap<ContentModel, Plan>>();

/** The render plan of a compiled model with the overrides of `shipped`, built once per model and overrides. */
export const planOf = (model: ContentModel, shipped: ReaderOverrides): Plan => {
    let byModel = plans.get(shipped);
    if (byModel === undefined) {
        byModel = new WeakMap();
        plans.set(shipped, byModel);
    }
    let plan = byModel.get(model);
    if (plan === undefined) {
        const override = overrideOf(shipped);
        plan = buildPlan(model, override, override);
        byModel.set(model, plan);
    }
    return plan;
};
