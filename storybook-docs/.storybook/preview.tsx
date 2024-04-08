/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dark, light } from "./frontifyTheme";

export const parameters = {
    options: {
        storySort: {
            order: [
                "Tokens",
                "Foundation",
                "Layout",
                "Typography",
                "Components",
            ],
        },
    },
    darkMode: {
        current: "light",
        darkClass: "tw-dark",
        classTarget: "html",
        stylePreview: true,
        dark: { ...dark },
        light: { ...light },
    },
    layout: "fullscreen",
    outline: {
        disable: true,
    },
};
