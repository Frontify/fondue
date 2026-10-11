/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElementBeside } from './dom';

/** An item's own checkbox, which a loose list puts in its first paragraph, and not a nested item's. */
const OWN_CHECKBOX = ':scope > input[type="checkbox"], :scope > p:first-child > input[type="checkbox"]';

/** The lists whose items carry their state as `aria-checked`, as Google Docs and Lexical write checklists. */
const ARIA_LISTS = 'ul, ol';

/** Replaces `list` with the package's own task list, `ul[data-task-list]`, holding its items, each with `data-checked`. */
const asTaskList = (list: Element, checkedOf: (item: Element) => boolean | undefined) => {
    const tasks = createElementBeside(list, 'ul');
    tasks.setAttribute('data-task-list', '');
    for (const item of Array.from(list.children)) {
        const checked = checkedOf(item);
        if (checked !== undefined) {
            item.setAttribute('data-checked', String(checked));
        }
        tasks.append(item);
    }
    list.replaceWith(tasks);
};

/** A GitHub task item's state, read from its own checkbox, which is removed; `undefined` for any other item. */
const gitHubChecked = (item: Element): boolean | undefined => {
    if (!item.matches('li.task-list-item')) {
        return undefined;
    }
    const checkbox = item.querySelector(OWN_CHECKBOX);
    if (checkbox === null) {
        return false;
    }
    checkbox.remove();
    return checkbox.hasAttribute('checked');
};

/** An `aria-checked` item's state; `undefined` for an item without it. */
const ariaChecked = (item: Element): boolean | undefined => {
    if (item.localName !== 'li' || !item.hasAttribute('aria-checked')) {
        return undefined;
    }
    return item.getAttribute('aria-checked') === 'true';
};

/**
 * Rewrites the task lists other editors write as the package's own `ul[data-task-list]` of `li[data-checked]`: GitHub's
 * `contains-task-list` lists of `task-list-item`s that start with a checkbox, without the checkboxes, and the lists of
 * `aria-checked` items that Google Docs and Lexical write.
 */
export const adoptTaskLists = (body: HTMLElement) => {
    for (const list of Array.from(body.querySelectorAll('ul.contains-task-list, ol.contains-task-list'))) {
        asTaskList(list, gitHubChecked);
    }
    for (const list of Array.from(body.querySelectorAll(ARIA_LISTS))) {
        if (Array.from(list.children).some((item) => ariaChecked(item) !== undefined)) {
            asTaskList(list, ariaChecked);
        }
    }
};
