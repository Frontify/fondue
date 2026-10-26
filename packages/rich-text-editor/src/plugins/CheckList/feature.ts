/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, isTaskListElement } from '#/model';

const isCheckbox = (element: Element) => element.localName === 'input' && element.getAttribute('type') === 'checkbox';

/** An item's own checkbox, which a loose list puts in its first paragraph, and not a nested item's. */
const ownCheckbox = (item: Element) => {
    for (const child of Array.from(item.children)) {
        if (isCheckbox(child)) {
            return child;
        }

        if (child === item.firstElementChild && child.localName === 'p') {
            const inside = Array.from(child.children).find(isCheckbox);
            if (inside !== undefined) {
                return inside;
            }
        }
    }

    return undefined;
};

const isList = (element: Element | null) => element?.localName === 'ul' || element?.localName === 'ol';

/** A task item's state: its `aria-checked`, its own GitHub checkbox, or its `data-checked`; `undefined` for none. */
const checkedOf = (item: Element): boolean | undefined => {
    const list = item.parentElement;
    if (isList(list) && item.hasAttribute('aria-checked')) {
        return item.getAttribute('aria-checked') === 'true';
    }

    if (isList(list) && list?.classList.contains('contains-task-list') === true && item.matches('.task-list-item')) {
        const checkbox = ownCheckbox(item);
        if (checkbox === undefined) {
            return false;
        }

        return checkbox.hasAttribute('checked');
    }

    if (item.hasAttribute('data-checked')) {
        return item.getAttribute('data-checked') === 'true';
    }

    return undefined;
};

/** Task lists as `task_list` and `task_item`, whose `checked` a native checkbox in the item's chrome shows. */
export const checkList = defineFeature({
    id: 'lists.task',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        task_list: {
            group: 'block',
            content: 'task_item+',
            attrs: {},
            html: ['ul', { 'data-task-list': '' }, 0],
            parse: [{ tag: 'ul[data-task-list]' }],
        },
        task_item: {
            content: 'paragraph block*',
            attrs: { nodeId: { type: 'string', required: true }, checked: { type: 'boolean', default: false } },
            html: ['li', { 'data-checked': { attr: 'checked' } }, 0],
            parse: [{ tag: 'li[data-checked]', attrs: { checked: { from: 'data-checked', equals: 'true' } } }],
        },
    },
    // The task lists other editors write, whose checkboxes no rule reads, so they go.
    parseRules: [
        {
            tag: 'ul, ol',
            node: 'task_list',
            value: (list) => {
                if (isTaskListElement(list)) {
                    return {};
                }

                return null;
            },
        },
        {
            tag: 'li[aria-checked], li.task-list-item',
            node: 'task_item',
            value: (item) => {
                const checked = checkedOf(item);
                if (checked === undefined) {
                    return null;
                }

                return { checked };
            },
        },
    ],
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossless' },
});
