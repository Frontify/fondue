/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { type EditorPart } from '#/bridge/pluginApi/plugin';
import { DefinitionError } from '#/model';
import { brandDocumentModel } from '#/plugins/profiles/brandDocument';
import { commentModel } from '#/plugins/profiles/comment';
import { documentModel } from '#/plugins/profiles/document';
import { inlineModel } from '#/plugins/profiles/inline';
import { featuresById, registry } from '#/plugins/registry';
import { engineOf, pluginsOf, readersOf } from '#/react/compile/compileEditor';
import { shipped as shippedBrandDocument } from '#/react/profiles/brandDocument';
import { shipped as shippedComment } from '#/react/profiles/comment';
import { shipped as shippedDocument } from '#/react/profiles/document';
import { shipped as shippedInline } from '#/react/profiles/inline';

const MODELS = {
    inline: inlineModel,
    comment: commentModel,
    document: documentModel,
    'brand-document': brandDocumentModel,
};

const PROFILES = {
    inline: shippedInline,
    comment: shippedComment,
    document: shippedDocument,
    'brand-document': shippedBrandDocument,
};

const golden = (value: unknown) => `${JSON.stringify(value, null, 4)}\n`;

const featuresOf = (ids: readonly string[]) => {
    try {
        return featuresById(ids).map(({ id, version }) => ({ id, version }));
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { error: error.code, details: error.details };
        }

        throw error;
    }
};

const inputRuleIds = (plugins: readonly EditorPart[]) =>
    plugins.flatMap(({ feature, inputRules }) => (inputRules ?? []).map(({ id }) => `${feature}:${id}`));

const toolbarOf = (plugins: readonly EditorPart[]) =>
    Object.fromEntries(
        plugins
            .filter(({ toolbar }) => toolbar !== undefined)
            .map(({ feature, toolbar }) => [feature, (toolbar ?? []).map(({ id }) => id)]),
    );

const handlerKeys = (plugins: readonly EditorPart[]) =>
    plugins.flatMap(({ feature, keys }) =>
        Object.entries(keys ?? {})
            .filter(([, binding]) => typeof binding === 'function')
            .map(([key]) => ({ plugin: feature, key, handler: true })),
    );

describe('goldens', () => {
    it('pins each profile model: reference, capabilities and fingerprint, and the feature registry lookups', async () => {
        const profiles = Object.fromEntries(
            Object.entries(MODELS).map(([name, model]) => [
                name,
                {
                    ref: { id: model.ref.id, version: model.ref.version },
                    capabilities: model.capabilities.map(({ id, version }) => ({ id, version })),
                    fingerprint: model.fingerprint,
                },
            ]),
        );
        const ids = Object.keys(registry).sort();
        const models = {
            profiles,
            featuresById: {
                shippedIds: ids,
                shipped: featuresOf(ids),
                unknownId: featuresOf(['core', 'no.such.feature', 'marks.bold']),
            },
        };
        await expect(golden(models)).toMatchFileSnapshot('./goldens/models.json');
    });

    it('pins each profile editor definition: parts, commands, keys, input rules, toolbars and reader overrides', async () => {
        const editors = Object.fromEntries(
            Object.entries(PROFILES).map(([name, shipped]) => {
                const { definition, presentation, touchPresentation } = shipped();
                const plugins = pluginsOf(definition);
                const { commands, keymap } = engineOf(definition);

                return [
                    name,
                    {
                        id: definition.id,
                        installedFeatures: definition.capabilities.map(({ id }) => id),
                        editorPartFeatures: plugins.map(({ feature }) => feature),
                        commandIds: [...commands.keys()],
                        keymap: keymap.map(({ plugin, key, command, payload }) => ({ plugin, key, command, payload })),
                        keyHandlers: handlerKeys(plugins),
                        inputRuleIds: inputRuleIds(plugins),
                        toolbars: {
                            partEntryIds: toolbarOf(plugins),
                            presentation: presentation.toolbar,
                            touchPresentation: touchPresentation?.toolbar ?? null,
                        },
                        readerOverrideFeatureIds: Object.keys(readersOf(definition)),
                    },
                ];
            }),
        );
        await expect(golden(editors)).toMatchFileSnapshot('./goldens/editors.json');
    });
});
