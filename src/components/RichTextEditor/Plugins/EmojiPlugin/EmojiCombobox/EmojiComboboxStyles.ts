/* (c) Copyright Frontify Ltd., all rights reserved. */

const item = [
    `
        font-size: var(--body-size-medium);
        min-height: 32px;
        user-select: none;
        color: var(--text-color-weak);
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        :hover {
            background: var(--box-neutral-color-hover);
            color: var(--box-neutral-inverse-color-hover);
        }
    `,
];

export const EmojiComboboxStyles = {
    root: [
        `
            max-width: 270px;
            max-height: 288px;
            border-radius: var(--radius);
            border: 1px solid var(--line-color-strong);
            box-shadow: var(--shadow-matrix);
            background: var(--base-color);
            z-index: 500;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        `,
    ],
    item: [
        ...item,
        `
            background: transparent;
        `,
    ],
    highlightedItem: [
        ...item,
        `
            background: var(--box-neutral-color);
            color: var(--box-neutral-inverse-color-hover);
        `,
    ],
};
