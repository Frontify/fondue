/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, PropsWithChildren } from "react";

type Theme = "dark" | "dark-ish" | "light" | "light-ish";

export type ThemeProps = PropsWithChildren<{
    theme?: Theme;
}>;

type Wat = {
    neutral: Record<string, string>;
    ambient: Record<string, string>;
};

const themeMap: Record<Theme, Wat> = {
    dark: {
        neutral: {
            "100": "#1a1d1d",
            "50": "#abadad",
            "20": "#d5d6d6",
            "10": "#eaebeb",
        },
        ambient: {
            "90": "#443185",
            "70": "#6449c4",
            "60": "#825fff",
            "50": "#9088ff",
            "40": "#c8d1ed",
            "20": "#e3e8f6",
        },
    },
    "dark-ish": {
        neutral: {
            "100": "#2d3232",
            "50": "#abadad",
            "20": "#d5d6d6",
            "10": "#eaebeb",
        },
        ambient: {
            "90": "#006452",
            "70": "#00a084",
            "60": "#00c8a5",
            "50": "#80dbb7",
            "40": "#bee1d4",
            "20": "#def0e9",
        },
    },
    light: {
        neutral: {
            "100": "#ffffff",
            "50": "#eaebeb",
            "20": "#abadad",
            "10": "#2d3232",
        },
        ambient: {
            "90": "#cc9000",
            "70": "#e6a200",
            "60": "#ffb400",
            "50": "#eec779",
            "40": "#e1d4be",
            "20": "#f0e9de",
        },
    },
    "light-ish": {
        neutral: {
            "100": "#eaebeb",
            "50": "#d5d6d6",
            "20": "#abadad",
            "10": "#2d3232",
        },
        ambient: {
            "90": "#992136",
            "70": "#cc2c48",
            "60": "#ff375a",
            "50": "#ff8066",
            "40": "#e1c4be",
            "20": "#f0e1de",
        },
    },
};

export const Theme: FC<ThemeProps> = ({ children, theme = "light" }) => {
    const values = themeMap[theme] as any;

    // const styles = Object.keys(values).reduce((pat, tone) => {
    //     const tmp = Object.keys(values[tone]).reduce((set, num) => {
    //         return `${set}
    //         --color-${tone}-${num}: ${values[tone][num]};`;
    //     }, "");

    //     return `${pat} ${tmp}`;
    // }, "");

    const style = Object.keys(values).reduce((pat, tone) => {
        const tmp = Object.keys((values as any)[tone]).reduce((set, num) => {
            return {
                ...set,
                [`--color-${tone}-${num}`]: (values as any)[tone][num],
            };
        }, {});

        return { ...pat, ...tmp };
    }, {});

    return (
        <div data-test-id="theme" style={style}>
            <div>{children}</div>
        </div>
    );
};
