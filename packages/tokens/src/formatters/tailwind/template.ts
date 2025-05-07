/* (c) Copyright Frontify Ltd., all rights reserved. */

type TemplateOptions = {
    theme: Record<string, unknown>;
    plugin: Record<string, unknown>;
};

export const template = ({ theme, plugin }: TemplateOptions) => {
    return `import plugin from 'tailwindcss/plugin';

export default {
    darkMode: "class",
    prefix: "tw-",
    theme: ${JSON.stringify(theme)},
    plugins: [
        plugin(function({ addComponents, addUtilities}) {
            const components = ${JSON.stringify(plugin)};
            addComponents(components);
        }),
    ]
}

export const fondueDiatypeTypographyUtil = plugin(({ addUtilities }) => {
    addUtilities({
        '.italic, i, em': {
            fontStyle: normal,
            fontFeatureSettings: '"ss01"',
            fontVariationSettings: '"slnt" -12',
        },
    });
});`;
};

export const templateDebug = ({ theme, plugin }: TemplateOptions) => {
    return `import plugin from 'tailwindcss/plugin';

export default {
    darkMode: "class",
    prefix: "tw-",
    safelist: [{ pattern: /.*/ }],
    theme: ${JSON.stringify(theme)},
    plugins: [
        plugin(function ({ addComponents, addUtilities }) {
            const components = ${JSON.stringify(plugin)};
            addComponents(components);
        }),
    ]
}

export const fondueDiatypeTypographyUtil = plugin(({ addUtilities }) => {
    addUtilities({
        '.italic, i, em': {
            fontStyle: normal,
            fontFeatureSettings: '"ss01"',
            fontVariationSettings: '"slnt" -12',
        },
    });
}); `;
};
