/* (c) Copyright Frontify Ltd., all rights reserved. */

const item = [
    `
        color: var(--text-color-weak);
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        :hover {
            background: var(--box-neutral-color-hover);
            color: var(--box-neutral-inverse-color-hover);
        };
    `,
];

export const MentionComboboxStyles = {
    root: [
        `
            max-width: 250px;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            z-index: 500;
            border-radius: var(--radius);
            border: 1px solid var(--line-color-strong);
            box-shadow: var(--shadow-matrix);
            background: var(--base-color);
        `,
    ],
    item: [...item],
    highlightedItem: [
        ...item,
        `
            background: var(--box-neutral-color);
            color: var(--box-neutral-inverse-color-hover);
        `,
    ],
};
