/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconListBullet, IconListNumbers, type FondueIcon } from '@frontify/fondue-icons';

import { definePlugin, type RteContent } from '#/core';

import { bulletListContent, numberedListContent } from './content';

/** Shared declaration of the two list plugins, which differ only in content, icon, label, shortcut and typing rule. */
const listPlugin = ({
    id,
    content,
    type,
    icon,
    label,
    keywords,
    markdown,
    shortcut,
}: {
    id: string;
    content: RteContent;
    type: 'bulletList' | 'numberedList';
    icon: FondueIcon;
    label: string;
    /** Words the `/` menu also finds it by. */
    keywords: readonly string[];
    /** What starts this list when typed at the beginning of a line. */
    markdown: readonly string[];
    /** The keyboard shortcut that toggles it, as other editors bind it. */
    shortcut: string;
}) =>
    definePlugin({
        id,
        content,
        // Active anywhere inside the list (the caret sits in a paragraph inside an
        // item); toggling wraps or unwraps.
        toolbar: [{ toggles: type, label, icon, shortcut, menu: { keywords } }],
        inputRules: markdown.map((match) => ({ kind: 'list' as const, match, list: type })),
    });

/** A bulleted list (`ul`). Shares its item with `numberedListPlugin`. */
export const bulletListPlugin = listPlugin({
    id: 'bullet-list',
    content: bulletListContent,
    type: 'bulletList',
    icon: IconListBullet,
    label: 'Bulleted list',
    keywords: ['ul', 'unordered', 'bullets'],
    markdown: ['- ', '* '],
    shortcut: 'Mod-Shift-8',
});

/** A numbered list (`ol`). Shares its item with `bulletListPlugin`. */
export const numberedListPlugin = listPlugin({
    id: 'numbered-list',
    content: numberedListContent,
    type: 'numberedList',
    icon: IconListNumbers,
    label: 'Numbered list',
    keywords: ['ol', 'ordered', 'numbers'],
    markdown: ['1. ', '1) '],
    shortcut: 'Mod-Shift-7',
});
