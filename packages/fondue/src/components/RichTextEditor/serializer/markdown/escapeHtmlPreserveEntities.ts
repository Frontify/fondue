/* (c) Copyright Frontify Ltd., all rights reserved. */

const replacements: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
};

export const escapeHtmlPreserveEntities = (value: string) =>
    value.replaceAll(/&(?!(#\d+|[A-Za-z]+);)|["'<>]/g, (match) => replacements[match] ?? match);
