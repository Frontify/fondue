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
    status: {
        statuses: {
            released: {
                background: "rgb(50, 210, 182)",
                color: "#ffffff",
                description: "This component is stable and released",
            },
            in_progress: {
                background: "rgb(154, 126, 254)",
                color: "#ffffff",
                description: "This component is in progress",
            },
            planned: {
                background: "rgb(254, 194, 50)",
                color: "#ffffff",
                description: "This component is planned to be revamped",
            },
            legacy: {
                background: "rgb(129, 132, 132)",
                color: "#ffffff",
                description: "This is a legacy component",
            },
            deprecated: {
                background: "rgb(153, 33, 54)",
                color: "#ffffff",
                description: "This is a legacy component",
            },
        },
    },
};
