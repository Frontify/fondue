/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dictionary } from 'style-dictionary';

import { buildTheme } from './buildTheme';
import { buildUtils } from './buildUtils';

export const tailwindFormat = {
    name: 'tailwind',
    format: ({ dictionary }: { dictionary: Dictionary }) => {
        const theme = buildTheme({ dictionary });
        const utils = buildUtils({ dictionary });
        return template(theme, utils);
    },
};

const template = (theme: Record<string, unknown>, plugins: string) => {
    return `import plugin from 'tailwindcss/plugin';

export default {
    theme: ${JSON.stringify(theme)},
    plugins: [${plugins}],
};`;
};
