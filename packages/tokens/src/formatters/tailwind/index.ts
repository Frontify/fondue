/* (c) Copyright Frontify Ltd., all rights reserved. */

import StyleDictionary, { type Formatter } from 'style-dictionary';

import { buildPlugin } from './buildPlugin';
import { buildTheme } from './buildTheme';
import { template, templateDebug } from './template';

const { fileHeader } = StyleDictionary.formatHelpers;

export const tailwindFormatter: (args: Parameters<Formatter>[0] & { debug?: boolean }) => string = ({
    dictionary,
    file,
    debug,
}) => {
    const plugin = buildPlugin({
        dictionary,
    });

    const theme = buildTheme({
        dictionary,
    });

    const tailwindConfigTemplate = debug === true ? templateDebug : template;

    return `${fileHeader({ file })}${tailwindConfigTemplate({ theme, plugin })}`;
};
