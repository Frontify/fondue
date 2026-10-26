/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';
import { codecContext } from '#/model/internal';

import { engineOf, pluginsOf } from '../compile/compileEditor';
import { menuItems, toolbarItems } from '../helpers/toolbarItems';
import { shipped as document } from '../profiles/document';

const { t } = codecContext(enUS, enUS);

describe('the toolbar items of a shipped profile', () => {
    it('puts the text style picker of the Document profile in the bubble toolbar', () => {
        const { definition, presentation } = document();
        const items = toolbarItems(
            engineOf(definition),
            definition.authoring,
            presentation,
            t,
            'en-US',
            pluginsOf(definition),
        );

        expect(items.filter(({ bubble }) => bubble).map(({ key }) => key)).toContain('text-style');
    });
});

describe('the More rows of a node', () => {
    it('leaves out a node row whose command the policy refuses, as Replace image when images cannot be edited', () => {
        const { definition, presentation } = document();
        const engine = engineOf(definition);
        const plugins = pluginsOf(definition);
        const rows = (authoring: typeof definition.authoring) =>
            menuItems(
                engine,
                authoring,
                toolbarItems(engine, authoring, presentation, t, 'en-US', plugins),
                t,
                'en-US',
                plugins,
            )
                .filter(({ node }) => node === 'asset_image')
                .map(({ label }) => label);
        const refusing = {
            ...definition.authoring,
            features: {
                ...definition.authoring.features,
                'media.image': { create: true, edit: false, remove: true, paste: true },
            },
        };

        expect(rows(definition.authoring)).toContain('Replace image');
        expect(rows(refusing)).not.toContain('Replace image');
        expect(rows(refusing)).toContain('Alternative text');
    });
});
