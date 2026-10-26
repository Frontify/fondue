/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileContentModel, defineFeature, DefinitionError, type Feature, type FeatureDeclaration } from '#/model';

const options = { id: 'test.model', version: 1 };
export const compile = (features: readonly Feature[]) => compileContentModel(features, options);
export const requiresCore = [{ id: 'core', version: 1 }];
export const feature = (declaration: FeatureDeclaration) => defineFeature(declaration)();

export const failureOf = (run: () => unknown) => {
    try {
        run();
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }

        throw error;
    }

    throw new Error('expected a DefinitionError');
};

export const block = (content: string) => ({
    group: 'block' as const,
    content,
    attrs: {},
    html: ['div', 0] as const,
    parse: [],
});
