/* (c) Copyright Frontify Ltd., all rights reserved. */

import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import { type ContentModel, type ContentNodeJSON, type Feature } from '#/model';

import { para, text, textFeatures, textModel } from './text';

export type ListKind = 'bullet' | 'ordered' | 'task';
export const LIST_KINDS: readonly ListKind[] = ['bullet', 'ordered', 'task'];

/** The text pair's features with the four list features, and `extra` after them. */
export const listModel = (extra: readonly Feature[] = []): ContentModel =>
    textModel([...textFeatures(), listItem(), bulletList(), orderedList(), taskList(), ...extra]);

/** An item of `kind` whose first paragraph holds `value`; a task item's `nodeId` names its text. */
export const item = (kind: ListKind, value: string, ...children: readonly ContentNodeJSON[]): ContentNodeJSON => {
    const content = [para(text(value)), ...children];
    if (kind === 'task') {
        return { type: 'task_item', attrs: { nodeId: `task-${value}`, checked: false }, content };
    }
    return { type: 'list_item', content };
};

/** A checked task item. */
export const done = (value: string, ...children: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'task_item',
    attrs: { nodeId: `task-${value}`, checked: true },
    content: [para(text(value)), ...children],
});

/** A list of `kind`; an ordered one starts at `start`. */
export const list = (kind: ListKind, items: readonly ContentNodeJSON[], start = 1): ContentNodeJSON => {
    if (kind === 'bullet') {
        return { type: 'bullet_list', attrs: { marker: null }, content: [...items] };
    }
    if (kind === 'ordered') {
        return { type: 'ordered_list', attrs: { start, marker: null }, content: [...items] };
    }
    return { type: 'task_list', content: [...items] };
};

const LIST_KEYS: Readonly<Record<string, string>> = { bullet_list: 'ul', ordered_list: 'ol', task_list: 'tasks' };

/**
 * A node as a short outline: a textblock as its text, a list as `{ ul | ol | tasks: items }` with `start` when it is
 * not 1, an item as its blocks, and a task item's blocks after `[x]` or `[ ]`.
 */
export const outline = (node: ContentNodeJSON): unknown => {
    const children = (node.content ?? []).map(outline);
    if (node.type === 'text') {
        return node.text;
    }
    if (node.type === 'paragraph' || node.type === 'heading') {
        return children.join('');
    }
    const key = LIST_KEYS[node.type];
    if (key !== undefined) {
        const start = node.attrs?.start;
        if (typeof start === 'number' && start !== 1) {
            return { [key]: children, start };
        }
        return { [key]: children };
    }
    if (node.type === 'task_item') {
        let box = '[ ]';
        if (node.attrs?.checked === true) {
            box = '[x]';
        }
        return [box, ...children];
    }
    if (node.type === 'list_item') {
        return children;
    }
    return { [node.type]: children };
};

/** The outline of each top-level block of a handle's snapshot. */
export const outlineOf = (handle: {
    getSnapshot(): { readonly document: { readonly content: ContentNodeJSON } };
}): unknown[] => (handle.getSnapshot().document.content.content ?? []).map(outline);

/** The outline of an item of `kind`, as `outline` writes it. */
export const itemOutline = (kind: ListKind, ...blocks: readonly unknown[]): unknown => {
    if (kind === 'task') {
        return ['[ ]', ...blocks];
    }
    return [...blocks];
};

/** The outline of a list of `kind`. */
export const listOutline = (kind: ListKind, items: readonly unknown[], start = 1): unknown => {
    const key = { bullet: 'ul', ordered: 'ol', task: 'tasks' }[kind];
    if (start !== 1) {
        return { [key]: [...items], start };
    }
    return { [key]: [...items] };
};
