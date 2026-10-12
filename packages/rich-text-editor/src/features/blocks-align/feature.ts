/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, setAttributes } from '#/model';

const SIDES = ['left', 'center', 'right'] as const;

const alignToggle = (
    align: string,
    labelKey: string,
    icon: string,
    when?: { readonly option: 'justify'; readonly equals: true },
) => {
    const entry = {
        kind: 'toggle' as const,
        command: 'block.align.set',
        payload: { align },
        labelKey,
        icon,
    };
    if (when === undefined) {
        return entry;
    }
    return { ...entry, when };
};

/**
 * Physical alignment on paragraphs and headings. `justify: false` leaves justify out of the values, the key and the
 * toolbar. Pressing the value every selected block already has removes it.
 */
export const align = (options?: { readonly justify?: boolean }) => {
    const values: string[] = [...SIDES];
    if (options?.justify !== false) {
        values.push('justify');
    }
    const justify = { option: 'justify' as const, equals: true as const };
    return defineFeature({
        id: 'blocks.align',
        version: 1,
        requires: [
            { id: 'core', version: 1 },
            { id: 'blocks.heading', version: 1 },
        ],
        options: { justify: { type: 'boolean', default: true } },
        attributes: {
            align: {
                on: ['paragraph', 'heading'],
                value: { type: 'enum', values, nullable: true, default: null },
                html: { style: 'text-align' },
                parse: { style: 'text-align' },
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
        commands: {
            'block.align.set': setAttributes(
                ['paragraph', 'heading'],
                { fields: { align: { type: 'enum', values } } },
                { toggle: true },
            ),
        },
        keys: {
            'Mod-Shift-l': { command: 'block.align.set', payload: { align: 'left' } },
            'Mod-Shift-e': { command: 'block.align.set', payload: { align: 'center' } },
            'Mod-Shift-r': { command: 'block.align.set', payload: { align: 'right' } },
            'Mod-Shift-j': { command: 'block.align.set', payload: { align: 'justify' }, when: justify },
        },
        toolbar: [
            alignToggle('left', 'RichTextEditor_alignLeft', 'IconTextAlignmentLeft'),
            alignToggle('center', 'RichTextEditor_alignCenter', 'IconTextAlignmentCentre'),
            alignToggle('right', 'RichTextEditor_alignRight', 'IconTextAlignmentRight'),
            alignToggle('justify', 'RichTextEditor_alignJustify', 'IconTextAlignmentJustify', justify),
        ],
    })(options);
};
