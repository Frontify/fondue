/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox';

import { ROOT_ID } from './constants';
import {
    type TreeItemMultiselectWithNodes,
    addSelectedIds,
    addSelectedItemsFromSelection,
    cleanOrphanSelectedIds,
    convertToPartialSelectedId,
    fixParentSelectionState,
    getExtendedId,
    getMultiselectCheckBoxState,
    getNewSelectedItems,
    getParentSelectedTreeItem,
    getSelectedChildrenItems,
    getSelectedTreeItem,
    removePartialFlagSelectedId,
    removeSelectedIds,
} from './multiselect';

const treeMultiselect: TreeItemMultiselectWithNodes[] = [
    {
        id: 'item-1',
        parentId: ROOT_ID,
        extendedId: `${ROOT_ID}/item-1`,
        nodes: [],
    },
    {
        id: 'item-22',
        parentId: ROOT_ID,
        extendedId: `${ROOT_ID}/item-22`,
        nodes: [
            {
                id: 'item-74',
                parentId: 'item-22',
                extendedId: 'item-22/item-74',
                nodes: [],
            },
            {
                id: 'item-265',
                parentId: 'item-22',
                extendedId: 'item-22/item-265',
                nodes: [
                    {
                        id: 'item-leaf-709',
                        parentId: 'item-265',
                        extendedId: 'item-265/item-leaf-709',
                        nodes: [],
                    },
                ],
            },
            {
                id: 'item-88',
                parentId: 'item-22',
                extendedId: 'item-22/item-88',
                nodes: [],
            },
            {
                id: 'item-48',
                parentId: 'item-22',
                extendedId: 'item-22/item-48',
                nodes: [],
            },
        ],
    },
    {
        id: 'item-122',
        parentId: ROOT_ID,
        extendedId: `${ROOT_ID}/item-122`,
        nodes: [],
    },
];

const selectedIds = [
    `${ROOT_ID}/item-1`,
    `*${ROOT_ID}/item-22`,
    'item-22/item-88',
    'item-22/item-48',
    'item-122/orphan-id',
];

describe('multiselect', () => {
    describe('getMultiselectCheckBoxState', () => {
        it('returns correct checkboxes states according to the state', () => {
            cy.wrap(getMultiselectCheckBoxState(true, true)).should('be.equal', CheckboxState.Checked);
            cy.wrap(getMultiselectCheckBoxState(true, false)).should('be.equal', CheckboxState.Checked);
            cy.wrap(getMultiselectCheckBoxState(false, false)).should('be.equal', CheckboxState.Unchecked);
            cy.wrap(getMultiselectCheckBoxState(false, true)).should('be.equal', CheckboxState.Mixed);
        });
    });

    describe('getSelectedChildrenItems', () => {
        it('returns selected items without partials', () => {
            cy.wrap(getSelectedChildrenItems(treeMultiselect, selectedIds, false)).should('deep.equal', [
                'item-1',
                'item-22',
            ]);
        });
        it('returns only partially selected items', () => {
            cy.wrap(getSelectedChildrenItems(treeMultiselect, selectedIds, true)).should('deep.equal', ['item-22']);
        });
        it('returns empty if no selectedId', () => {
            cy.wrap(getSelectedChildrenItems(treeMultiselect, [], false)).should('be.have.length', 0);
        });
    });

    describe('getSelectedTreeItem', () => {
        it('returns item from the tree given an item id', () => {
            cy.wrap(getSelectedTreeItem(treeMultiselect, 'item-leaf-709')).should('deep.equal', {
                id: 'item-leaf-709',
                parentId: 'item-265',
                extendedId: 'item-265/item-leaf-709',
                nodes: [],
            });
        });
    });

    describe('getParentSelectedTreeItem', () => {
        it('returns parent item from the tree given an item id', () => {
            cy.wrap(getParentSelectedTreeItem(treeMultiselect, 'item-leaf-709', null)).should('deep.equal', {
                id: 'item-265',
                parentId: 'item-22',
                extendedId: 'item-22/item-265',
                nodes: [
                    {
                        id: 'item-leaf-709',
                        parentId: 'item-265',
                        extendedId: 'item-265/item-leaf-709',
                        nodes: [],
                    },
                ],
            });
        });
    });

    describe('addSelectedItemsFromSelection', () => {
        it('should flag parents as partial if siblings in the way up are not selected and fully selected if they are', () => {
            const result = addSelectedItemsFromSelection(treeMultiselect, 'item-leaf-709', ['item-265/item-leaf-709']);
            console.log(result);
            cy.wrap(addSelectedItemsFromSelection(treeMultiselect, 'item-leaf-709', ['item-265/item-leaf-709'])).should(
                'deep.equal',
                ['item-265/item-leaf-709', 'item-22/item-265', `*${ROOT_ID}/item-22`],
            );
        });
        it('should get the children selected if a parent is selected', () => {
            cy.wrap(addSelectedItemsFromSelection(treeMultiselect, 'item-265', ['item-22/item-265'])).should(
                'deep.equal',
                ['item-22/item-265', `*${ROOT_ID}/item-22`, 'item-265/item-leaf-709'],
            );
        });
        it('returns unchanged selectedIds array if non-exitent tree item is sent', () => {
            cy.wrap(addSelectedItemsFromSelection(treeMultiselect, 'item-leaf-700000', [`${ROOT_ID}/item-22`])).should(
                'deep.equal',
                [`${ROOT_ID}/item-22`],
            );
        });
    });

    describe('fixParentSelectionState', () => {
        const parent = {
            id: 'item-22',
            parentId: ROOT_ID,
            extendedId: `${ROOT_ID}/item-22`,
            nodes: [
                {
                    id: 'item-74',
                    parentId: 'item-22',
                    extendedId: 'item-22/item-74',
                    nodes: [],
                },
                {
                    id: 'item-265',
                    parentId: 'item-22',
                    extendedId: 'item-22/item-265',
                    nodes: [
                        {
                            id: 'item-leaf-709',
                            parentId: 'item-265',
                            extendedId: 'item-265/item-leaf-709',
                            nodes: [],
                        },
                    ],
                },
                {
                    id: 'item-88',
                    parentId: 'item-22',
                    extendedId: 'item-22/item-88',
                    nodes: [],
                },
                {
                    id: 'item-48',
                    parentId: 'item-22',
                    extendedId: 'item-22/item-48',
                    nodes: [],
                },
            ],
        };

        it('should flag parent as fully selected if ther no siblings', () => {
            const singleChild = {
                id: 'item-265',
                parentId: 'item-22',
                extendedId: 'item-22/item-265',
                nodes: [
                    {
                        id: 'item-leaf-709',
                        parentId: 'item-265',
                        extendedId: 'item-265/item-leaf-709',
                        nodes: [],
                    },
                ],
            };
            cy.wrap(fixParentSelectionState(singleChild, ['item-265/item-leaf-709'])).should('deep.equal', [
                'item-265/item-leaf-709',
                'item-22/item-265',
            ]);
        });
        it('should flag parent as partial if siblings in the way up are not selected and fully selected if they are', () => {
            cy.wrap(fixParentSelectionState(parent, ['item-22/item-265'])).should('deep.equal', [
                'item-22/item-265',
                `*${ROOT_ID}/item-22`,
            ]);
        });
        it('should flag parent as selected if all siblings are selected', () => {
            cy.wrap(
                fixParentSelectionState(parent, [
                    'item-22/item-265',
                    'item-22/item-74',
                    'item-22/item-88',
                    'item-22/item-48',
                ]),
            ).should('deep.equal', [
                'item-22/item-265',
                'item-22/item-74',
                'item-22/item-88',
                'item-22/item-48',
                `${ROOT_ID}/item-22`,
            ]);
        });

        it('should flag parent from partial to selected if all siblings are selected', () => {
            cy.wrap(
                fixParentSelectionState(parent, [
                    'item-22/item-265',
                    'item-22/item-74',
                    'item-22/item-88',
                    'item-22/item-48',
                    `*${ROOT_ID}/item-22`,
                ]),
            ).should('deep.equal', [
                'item-22/item-265',
                'item-22/item-74',
                'item-22/item-88',
                'item-22/item-48',
                `${ROOT_ID}/item-22`,
            ]);
        });
    });

    describe('cleanOrphanSelectedIds', () => {
        it('returns clean slectedIds without orphan items', () => {
            const result = cleanOrphanSelectedIds(selectedIds);
            console.log(result);
            cy.wrap(cleanOrphanSelectedIds(selectedIds)).should('deep.equal', [
                `${ROOT_ID}/item-1`,
                `*${ROOT_ID}/item-22`,
                'item-22/item-88',
                'item-22/item-48',
            ]);
        });
    });

    describe('convertToPartialSelectedId', () => {
        it('returns clean slectedIds without orphan items', () => {
            cy.wrap(convertToPartialSelectedId(['item-22/item-74', 'item-007'])).should('deep.equal', [
                '*item-22/item-74',
                '*item-007',
            ]);
        });
    });
    describe('removePartialFlagSelectedId', () => {
        it('returns clean slectedIds without orphan items', () => {
            cy.wrap(removePartialFlagSelectedId(['*item-22/item-74', 'item-007'])).should('deep.equal', [
                'item-22/item-74',
                'item-007',
            ]);
        });
    });
    describe('getExtendedId', () => {
        const itemWithExtendedId = {
            id: 'item-74',
            parentId: 'item-22',
            extendedId: 'item-22=item-74', // this not-standard format is to ensure the function returns this field.
            nodes: [],
        };
        const itemWithoutExtendedId = {
            id: 'item-74',
            parentId: 'item-22',
            nodes: [],
        };
        it('returns the already present extended id in the item', () => {
            cy.wrap(getExtendedId(itemWithExtendedId)).should('be.equal', 'item-22=item-74');
        });
        it('returns the extended id present in the item built as <parentId>/<itemId>', () => {
            cy.wrap(getExtendedId(itemWithoutExtendedId)).should('be.equal', 'item-22/item-74');
        });
    });
    describe('removeSelectedIds', () => {
        it('removes the passed Ids from the selected array if it is selected', () => {
            cy.wrap(removeSelectedIds(selectedIds, ['item-22/item-48'], false)).should('deep.equal', [
                `${ROOT_ID}/item-1`,
                `*${ROOT_ID}/item-22`,
                'item-22/item-88',
                'item-122/orphan-id',
            ]);
        });
        it('removes the passed Ids from the selected array if it is partially selected', () => {
            cy.wrap(removeSelectedIds(selectedIds, [`${ROOT_ID}/item-22`], true)).should('deep.equal', [
                `${ROOT_ID}/item-1`,
                'item-22/item-88',
                'item-22/item-48',
                'item-122/orphan-id',
            ]);
        });
    });
    describe('addSelectedIds', () => {
        it('adds the id to the selected ids', () => {
            cy.wrap(addSelectedIds(selectedIds, [`${ROOT_ID}/item-1111`], false)).should('deep.equal', [
                `${ROOT_ID}/item-1`,
                `*${ROOT_ID}/item-22`,
                'item-22/item-88',
                'item-22/item-48',
                'item-122/orphan-id',
                `${ROOT_ID}/item-1111`,
            ]);
        });
        it('adds the id as partially selected', () => {
            cy.wrap(addSelectedIds(selectedIds, [`${ROOT_ID}/item-1111`], true)).should('deep.equal', [
                `${ROOT_ID}/item-1`,
                `*${ROOT_ID}/item-22`,
                'item-22/item-88',
                'item-22/item-48',
                'item-122/orphan-id',
                `*${ROOT_ID}/item-1111`,
            ]);
        });
    });

    describe('getNewSelectedItems', () => {
        const selectedIds = ['item-265/item-leaf-709', 'item-22/item-265', `*${ROOT_ID}/item-22`];
        it('returns the clean selected ids array with the item included', () => {
            cy.wrap(getNewSelectedItems('item-leaf-709', [], treeMultiselect, false)).should('deep.equal', selectedIds);
        });
        it('returns the clean selected ids array with the item removed', () => {
            cy.wrap(getNewSelectedItems('item-leaf-709', selectedIds, treeMultiselect, false)).should('deep.equal', []);
        });
    });
});
