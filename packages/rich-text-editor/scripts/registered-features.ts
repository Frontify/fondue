/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Feature, type FeatureDeclaration } from '../src/model/declarations.ts';
import { featureInternals } from '../src/model/feature.ts';

/** The declaration of each registered feature, in registry order. */
export const registeredDeclarations = async (): Promise<FeatureDeclaration[]> => {
    // The registry imports through the `#/` alias, which `tsx` resolves and the node typecheck project does not.
    const { registry } = (await import(new URL('../src/features/registry.ts', import.meta.url).href)) as {
        readonly registry: Readonly<Record<string, () => Feature>>;
    };
    return Object.values(registry).map((factory) => {
        const feature = factory();
        const internals = featureInternals(feature);
        if (internals === undefined) {
            throw new Error(`The registry entry ${feature.id} is not a feature that defineFeature made.`);
        }
        return internals.declaration;
    });
};
