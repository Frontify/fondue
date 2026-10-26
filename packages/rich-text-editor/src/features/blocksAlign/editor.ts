/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';
import { type JsonObject } from '#/model';

import { align } from './feature';

const SIDES = [
    { align: 'left', key: 'Mod-Shift-l', labelKey: 'RichTextEditor_alignLeft', icon: 'IconTextAlignmentLeft' },
    { align: 'center', key: 'Mod-Shift-e', labelKey: 'RichTextEditor_alignCenter', icon: 'IconTextAlignmentCentre' },
    { align: 'right', key: 'Mod-Shift-r', labelKey: 'RichTextEditor_alignRight', icon: 'IconTextAlignmentRight' },
    { align: 'justify', key: 'Mod-Shift-j', labelKey: 'RichTextEditor_alignJustify', icon: 'IconTextAlignmentJustify' },
] as const;

/**
 * Aligns the selected paragraphs and headings from Mod+Shift+L, E, R and J or the toolbar; pressing the value every
 * selected block already has removes it. Justify is there only while the feature's `justify` option is on.
 */
export const alignEditor = defineEditorPart(align, (options: JsonObject) => {
    const sides = SIDES.filter(({ align: value }) => value !== 'justify' || options.justify !== false);

    return {
        needs: ['attributes'],
        commands: {
            'block.align.set': {
                payload: { fields: { align: { type: 'enum', values: sides.map(({ align: value }) => value) } } },
                run: (api, { align: value }: { align: string }) =>
                    api.attributes.set(['paragraph', 'heading'], { align: value }, { toggle: true }),
                active: (api, { align: value }) => api.attributes.active(['paragraph', 'heading'], { align: value }),
            },
        },
        keys: Object.fromEntries(
            sides.map(({ align: value, key }) => [key, { command: 'block.align.set', payload: { align: value } }]),
        ),
        toolbar: sides.map(({ align: value, labelKey, icon }) => ({
            id: `align-${value}`,
            kind: 'toggle' as const,
            command: 'block.align.set',
            payload: { align: value },
            labelKey,
            icon,
        })),
    };
});
