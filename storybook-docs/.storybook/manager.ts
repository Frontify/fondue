/* (c) Copyright Frontify Ltd., all rights reserved. */

import { addons, types } from '@storybook/manager-api';
import { createElement } from 'react';

import fonduePackageJson from '../../packages/fondue/package.json';

import { dark } from './frontifyTheme';

addons.setConfig({
    theme: dark,
});

addons.register('frontify/version-display', () => {
    addons.add('frontify/version-display/fondue', {
        title: 'Fondue Version',
        type: types.TOOL,
        match: ({ viewMode }) => {
            console.log('viewMode', viewMode);
            return true;
        },
        render: () =>
            createElement(
                'span',
                {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        color: 'rgb(210, 210, 210)',
                    },
                },
                `v${fonduePackageJson.version}`,
            ),
    });
});
