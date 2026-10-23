/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Plain list documents for component tests, which pass them to `ListProbe` as props. */
export type Block = Readonly<Record<string, unknown>>;

export const paragraph = (value: string): Block => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [{ type: 'text', text: value }],
});
export const listItem = (value: string, ...children: readonly Block[]): Block => ({
    type: 'list_item',
    content: [paragraph(value), ...children],
});
export const taskItem = (nodeId: string, value: string, checked = false): Block => ({
    type: 'task_item',
    attrs: { nodeId, checked },
    content: [paragraph(value)],
});
export const bullets = (...items: readonly Block[]): Block => ({
    type: 'bullet_list',
    attrs: { marker: null },
    content: [...items],
});
export const numbered = (start: number, ...items: readonly Block[]): Block => ({
    type: 'ordered_list',
    attrs: { start, marker: null },
    content: [...items],
});
export const tasks = (...items: readonly Block[]): Block => ({ type: 'task_list', content: [...items] });
