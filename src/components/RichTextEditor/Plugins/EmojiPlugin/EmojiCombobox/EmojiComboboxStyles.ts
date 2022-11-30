/* (c) Copyright Frontify Ltd., all rights reserved. */

const item = [
    `
        font-size: var(--body-size-medium);
        min-height: 32px;
        user-select: none;
        color: var(--text-color);
    `,
];

export const EmojiComboboxStyles = {
    root: [
        `
            max-width: 250px;
            max-height: 288px;
            border-radius: var(--radius);
            border: 1px solid var(--line-color-strong);
            box-shadow: var(--shadow-matrix);
            background: var(--base-color);
            z-index: 500;
        `,
    ],
    item: [
        ...item,
        `
            background: transparent;
            :hover {
                background: var(--box-neutral-color-hover);
            }
        `,
    ],
    highlightedItem: [
        ...item,
        `
            background: var(--box-neutral-color);
            :hover {
                background: var(--box-neutral-color-hover);
            }
        `,
    ],
};
