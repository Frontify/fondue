/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum EditorActions {
    TEXT_STYLES = 'text-styles',
    ALIGN_LEFT = 'align-left',
    ALIGN_CENTER = 'align-center',
    ALIGN_RIGHT = 'align-right',
    ALIGN_JUSTIFY = 'align-justify',
    BOLD = 'bold',
    ITALIC = 'italic',
    UNDERLINE = 'underline',
    STRIKETHROUGH = 'strikethrough',
    CODE = 'code',
    CHECK_ITEM = 'check-item',
    LINK = 'link',
    BUTTON = 'button',
    ORDERED_LIST = 'ordered-list',
    UNORDERED_LIST = 'unordered-list',
    RESET_FORMATTING = 'reset-formatting',
}

export const defaultActions = [
    [EditorActions.TEXT_STYLES],
    [
        EditorActions.BOLD,
        EditorActions.ITALIC,
        EditorActions.UNDERLINE,
        EditorActions.STRIKETHROUGH,
        EditorActions.LINK,
        EditorActions.BUTTON,
        EditorActions.CODE,
    ],
    [
        EditorActions.ALIGN_LEFT,
        EditorActions.ALIGN_CENTER,
        EditorActions.ALIGN_RIGHT,
        EditorActions.ALIGN_JUSTIFY,
        EditorActions.UNORDERED_LIST,
        EditorActions.CHECK_ITEM,
        EditorActions.ORDERED_LIST,
        EditorActions.RESET_FORMATTING,
    ],
];
