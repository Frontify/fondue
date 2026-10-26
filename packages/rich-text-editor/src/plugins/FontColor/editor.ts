/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { type JsonObject } from '#/model';

import { fontColor } from './feature';

const COLOR_MARKS = ['font_color', 'highlight'] as const;

const ColorMenu = lazyPart(() => import('./components/ColorMenu').then((loaded) => loaded.ColorMenu));

/**
 * Sets and removes the text colour, opens the "A" colour menu from the toolbar, and sets the last colour again from
 * Mod+Shift+H; Clear removes text and highlight colours as one undo step.
 */
export const fontColorEditor = defineEditorPart(fontColor, (options: JsonObject) => ({
    needs: ['marks', 'overlays'],
    commands: {
        'mark.font-color.set': {
            payload: {
                fields: { tokenId: { type: 'id' }, value: { type: 'color' } },
                exactlyOne: ['tokenId', 'value'],
                nullable: true,
            },
            run: (api, payload: { tokenId: string } | { value: string } | null) => {
                if (payload === null) {
                    return api.marks.remove('font_color');
                }

                return api.marks.set('font_color', payload);
            },
            active: (api, payload) => {
                if (payload === null) {
                    return false;
                }

                return api.marks.active('font_color', payload);
            },
        },
        'mark.color.reapply': { run: (api) => api.marks.reapply(COLOR_MARKS) },
        'mark.color.clear': { run: (api) => api.marks.remove(COLOR_MARKS) },
        'mark.color.menu.open': {
            payload: { fields: { tokenIds: { type: 'list', items: { type: 'id' }, optional: true } } },
            // The selection's start sits in text that is not code.
            enabled: (api) => {
                const { blockType, verbatim } = api.selection();

                return blockType !== null && !verbatim;
            },
            run: (api, payload: { tokenIds?: readonly string[] } | undefined) => {
                api.overlays.open(
                    ColorMenu,
                    { tokenIds: payload?.tokenIds, literalText: options.literalColors === true },
                    'selection',
                );

                return true;
            },
        },
    },
    keys: { 'Mod-Shift-h': 'mark.color.reapply' },
    toolbar: [
        {
            id: 'color-menu',
            kind: 'button',
            command: 'mark.color.menu.open',
            labelKey: 'RichTextEditor_colorMenu',
            icon: 'IconColorFan',
            opensOverlay: true,
        },
    ],
}));
