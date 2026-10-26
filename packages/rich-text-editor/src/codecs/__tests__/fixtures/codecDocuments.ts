/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    compileContentModel,
    defineFeature,
    DefinitionError,
    type ContentModel,
    type Diagnostic,
    type FeatureDeclaration,
    type JsonValue,
    type RichTextDocument,
} from '#/model';
import { core } from '#/plugins/Core/feature';

export const requires = [{ id: 'core', version: 1 }];
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

export const compile = (...declarations: readonly FeatureDeclaration[]) =>
    compileContentModel([core(), ...declarations.map((declaration) => defineFeature(declaration)())], {
        id: 'test.model',
        version: 1,
    });
export const testDocument = (model: Pick<ContentModel, 'ref' | 'capabilities'>, ...blocks: JsonValue[]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;
export const codesOf = (diagnostics: readonly Diagnostic[]) => diagnostics.map(({ code }) => code);
