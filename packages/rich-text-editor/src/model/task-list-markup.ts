/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Whether `list` is a task list: the package's own `ul[data-task-list]`, GitHub's `contains-task-list`, or a list of
 * `aria-checked` items, as Google Docs and Lexical write checklists.
 * Public so the shipped features and the core share it.
 */
export const isTaskListElement = (list: Element) =>
    (list.localName === 'ul' && list.hasAttribute('data-task-list')) ||
    list.classList.contains('contains-task-list') ||
    Array.from(list.children).some((item) => item.localName === 'li' && item.hasAttribute('aria-checked'));
