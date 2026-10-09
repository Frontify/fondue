/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type ContentModel, type FeatureDeclaration } from '#/model';
import { buildPlan, type MarkPlan, type NodePlan, type Plan as BasePlan } from '#/model/output';
import { ownValue } from '#/model/values';

import { declaredOverrides, type ReaderNodeProps } from './define';

/** What the reader reads about one node or mark type: the shared plan and its override. */
interface Overridden {
    readonly override: ComponentType<ReaderNodeProps> | undefined;
}
export type Plan = BasePlan<NodePlan & Overridden, MarkPlan & Overridden>;

const overrideOf = (feature: FeatureDeclaration, name: string): Overridden => {
    const renderers = declaredOverrides(feature);
    if (renderers === undefined) {
        return { override: undefined };
    }
    return { override: ownValue(renderers, name) };
};

const plans = new WeakMap<ContentModel, Plan>();

/** The render plan of a compiled model, built once per model. */
export const planOf = (model: ContentModel): Plan => {
    let plan = plans.get(model);
    if (plan === undefined) {
        plan = buildPlan(model, overrideOf, overrideOf);
        plans.set(model, plan);
    }
    return plan;
};
