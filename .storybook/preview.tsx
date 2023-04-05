/* (c) Copyright Frontify Ltd., all rights reserved. */

import '../src/styles.css';
import { dark, light } from './frontifyTheme';
import { DecoratorFn } from '@storybook/react';
import React from 'react';

export const withTheme: DecoratorFn = (Story, context) => {
    // Get values from story parameter first, else fallback to globals
    const theme = context.parameters.theme || context.globals.theme;

    switch (theme) {
        case 'side-by-side': {
            return (
                <div className="side-by-side">
                    <div className="light theme">
                        <Story />
                    </div>
                    <div className="tw-dark theme">
                        <Story />
                    </div>
                </div>
            );
        }
        default: {
            return (
                <div className={`${theme} theme`}>
                    <Story />
                </div>
            );
        }
    }
};
export const decorators = [withTheme];
export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            // The icon for the toolbar item
            icon: 'circlehollow',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'light' },
                { value: 'tw-dark', icon: 'circle', title: 'dark' },
                { value: 'side-by-side', icon: 'sidebar', title: 'side by side' },
            ],
            showName: true,
        },
    },
};
export const parameters = {
    options: {
        storySort: {
            order: ['Tokens', 'Foundation', 'Layout', 'Typography', 'Components'],
        },
    },
    darkMode: {
        darkClass: 'tw-dark',
        classTarget: 'html',
        current: 'light',
        stylePreview: true,
        dark: { ...dark },
        light: { ...light },
    },
    layout: 'fullscreen',
    docs: {
        canvas: {
            sourceState: 'shown',
        },
    },
};
