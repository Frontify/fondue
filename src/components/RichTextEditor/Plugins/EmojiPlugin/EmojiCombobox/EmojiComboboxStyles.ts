/* (c) Copyright Frontify Ltd., all rights reserved. */

const item = [
    `
        font-size: 16px;
        min-height: 36px;
        user-select: none;
        color: rgba(108, 112, 112, 1);
        color: rgba(45, 50, 50, 1);
    `,
];

export const EmojiComboboxStyles = {
    root: [
        `
            max-width: 250px;
            max-height: 288px;
            border-radius: 4px;
            border: 1px solid rgba(8, 8, 8, 0.15);
            box-shadow: 0px 3px 10px 0px rgba(8, 8, 8, 0.15);
            background: rgb(255, 255, 255);
            z-index: 500;
        `,
    ],
    item: [
        ...item,
        `
            background: transparent;

            :hover {
                background: rgb(234, 235, 235, 1);
            }
        `,
    ],
    highlightedItem: [
        ...item,
        `
            background: rgba(241, 241, 241, 1);

            :hover {
                background: rgb(234, 235, 235, 1);
            }
        `,
    ],
};
