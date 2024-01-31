/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { StorybookConfig } from '@storybook/react-vite';
import ts from 'typescript';

export default <StorybookConfig>{
    framework: '@storybook/react-vite',
    stories: ['../src/**/*.stories.tsx'],
    addons: ['storybook-dark-mode', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
    staticDirs: ['assets'],
    docs: {
        autodocs: 'tag',
    },
    typescript: {
        reactDocgenTypescriptOptions: {
            componentNameResolver: (expression: ts.Symbol) => expression.getName(),
        },
    },
};
