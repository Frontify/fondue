/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LazyTreeNode } from './types';

const folder = (id: string, name: string, isSelected?: boolean | 'indeterminate'): LazyTreeNode => ({
    id,
    name,
    isFolder: true,
    isSelected,
});
const file = (id: string, name: string, { isSelected = false, isDisabled = false } = {}): LazyTreeNode => ({
    id,
    name,
    isFolder: false,
    isSelected,
    isDisabled,
});

/**
 * Folder summaries follow the Tree's default derivation: `true` = every selectable descendant
 * is selected (`Pictures` qualifies although the disabled `logo.svg` is not),
 * `'indeterminate'` = some are (`Documents` and `Reports` load eagerly because of it),
 * omitted = none is.
 */
const CHILDREN_BY_PARENT: Record<string, LazyTreeNode[]> = {
    root: [
        folder('documents', 'Documents', 'indeterminate'),
        folder('pictures', 'Pictures', true),
        folder('archive', 'Archive'),
        folder('templates', 'Templates (empty)'),
        file('README.md', 'README.md'),
        file('LICENSE', 'LICENSE', { isDisabled: true }),
    ],
    documents: [
        folder('documents/reports', 'Reports', 'indeterminate'),
        file('documents/invoice.pdf', 'invoice.pdf', { isSelected: true }),
        file('documents/notes.txt', 'notes.txt'),
        file('documents/contract.pdf', 'contract.pdf', { isSelected: true, isDisabled: true }),
    ],
    'documents/reports': [
        file('documents/reports/q1.pdf', 'q1.pdf', { isSelected: true }),
        file('documents/reports/q2.pdf', 'q2.pdf'),
    ],
    pictures: [
        folder('pictures/vacation', 'Vacation', true),
        file('pictures/avatar.png', 'avatar.png', { isSelected: true }),
        file('pictures/logo.svg', 'logo.svg', { isDisabled: true }),
    ],
    'pictures/vacation': [
        file('pictures/vacation/beach.jpg', 'beach.jpg', { isSelected: true }),
        file('pictures/vacation/sunset.jpg', 'sunset.jpg', { isSelected: true }),
    ],
    archive: [
        folder('archive/2023', '2023'),
        file('archive/old-invoice.pdf', 'old-invoice.pdf'),
        file('archive/legal-hold.pdf', 'legal-hold.pdf', { isDisabled: true }),
    ],
    'archive/2023': [file('archive/2023/jan.pdf', 'jan.pdf'), file('archive/2023/feb.pdf', 'feb.pdf')],
    templates: [],
};

/** Story stand-in for a backend: resolves a folder's direct children after a short delay. */
export const fetchChildren = (parentId: string | null): Promise<LazyTreeNode[]> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(CHILDREN_BY_PARENT[parentId ?? 'root'] ?? []), 600);
    });
