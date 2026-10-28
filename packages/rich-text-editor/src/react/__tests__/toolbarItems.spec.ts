/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';
import { codecContext } from '#/model/internal';
import { type ToolbarItem } from '#/ui/helpers/items';

import { compiledOf, pluginsOf } from '../compile/compileEditor';
import { menuItems, toolbarItems } from '../helpers/toolbarItems';
import { shipped as brandDocument } from '../profiles/brandDocument';
import { shipped as comment } from '../profiles/comment';
import { shipped as document } from '../profiles/document';
import { shipped as inline } from '../profiles/inline';
import { type ShippedProfile } from '../profiles/parts';

const { translate } = codecContext(enUS, enUS);

describe('the toolbar items of a shipped profile', () => {
    it('puts the text style picker of the Document profile in the bubble toolbar', () => {
        const { definition, presentation } = document();
        const items = toolbarItems(
            compiledOf(definition),
            definition.authoring,
            presentation,
            translate,
            'en-US',
            pluginsOf(definition),
        );

        expect(items.filter(({ bubble }) => bubble).map(({ key }) => key)).toContain('text-style');
    });
});

type ToolbarRef = string | { command: string; payload: Record<string, string | number> };

const ORDERED = { command: 'list.ordered.toggle', payload: { start: 1 } } as const;
const align = (value: string): ToolbarRef => ({ command: 'block.align.set', payload: { align: value } });

/** The toolbar groups each shipped profile shows. */
const SHIPPED = {
    inline: [['mark.bold.toggle', 'mark.italic.toggle'], ['link.edit']],
    comment: [
        ['mark.bold.toggle', 'mark.italic.toggle', 'mark.strike.toggle', 'mark.code.toggle'],
        ['link.edit'],
        ['list.bullet.toggle', ORDERED, 'list.task.toggle'],
        ['quote.toggle', 'code-block.toggle'],
        ['mention.search.open', 'emoji.picker.open'],
    ],
    document: [
        ['history.undo', 'history.redo'],
        ['text-style'],
        [
            'mark.bold.toggle',
            'mark.italic.toggle',
            'mark.underline.toggle',
            'mark.strike.toggle',
            'mark.code.toggle',
            'format.clear',
        ],
        ['mark.color.menu.open'],
        ['link.edit'],
        ['list.bullet.toggle', ORDERED, 'list.task.toggle'],
        ['image.insert', 'rule.insert', 'mention.search.open', 'emoji.picker.open'],
        ['checks.open', 'outline.toggle'],
    ],
    'brand-document': [
        ['history.undo', 'history.redo'],
        ['text-style'],
        [
            'mark.bold.toggle',
            'mark.italic.toggle',
            'mark.underline.toggle',
            'mark.strike.toggle',
            'mark.code.toggle',
            'format.clear',
        ],
        ['mark.color.menu.open'],
        ['link.edit'],
        ['list.bullet.toggle', ORDERED, 'list.task.toggle'],
        [align('left'), align('center'), align('right'), align('justify')],
        ['image.insert', 'rule.insert', 'mention.search.open', 'emoji.picker.open'],
        ['checks.open', 'outline.toggle'],
    ],
} as const;

const separatorsOf = (groups: readonly (readonly ToolbarRef[])[]) =>
    groups.flatMap((group, groupIndex) =>
        group.map((id, index) => ({ id, groupStart: groupIndex > 0 && index === 0 })),
    );

const shownOf = (items: readonly ToolbarItem[]) =>
    items.map((item) => ({
        id: item.payload === undefined ? item.command : { command: item.command, payload: item.payload },
        groupStart: item.groupStart,
    }));

const itemsOf = (profile: ShippedProfile) => {
    const { definition, presentation } = profile;

    return toolbarItems(
        compiledOf(definition),
        definition.authoring,
        presentation,
        translate,
        'en-US',
        pluginsOf(definition),
    );
};

describe('the toolbars of the shipped profiles', () => {
    it.each([
        ['Inline', inline, SHIPPED.inline],
        ['Comment', comment, SHIPPED.comment],
        ['Document', document, SHIPPED.document],
        ['Brand document', brandDocument, SHIPPED['brand-document']],
    ] as const)('keeps the %s toolbar item ids and group separators', (_name, shipped, groups) => {
        expect(shownOf(itemsOf(shipped()))).toEqual(separatorsOf(groups));
    });
});

describe('the More rows of a node', () => {
    it('leaves out a node row whose command the policy refuses, as Replace image when images cannot be edited', () => {
        const { definition, presentation } = document();
        const engine = compiledOf(definition);
        const plugins = pluginsOf(definition);
        const rows = (authoring: typeof definition.authoring) =>
            menuItems(
                engine,
                authoring,
                toolbarItems(engine, authoring, presentation, translate, 'en-US', plugins),
                translate,
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
