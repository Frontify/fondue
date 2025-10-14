/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import '@frontify/fondue-tokens/themes/theme.dark.css';
import '@frontify/fondue-components/styles';

import { Decorator } from '@storybook/react-vite';
import '../src/styles.css';
import { dark, light } from './frontifyTheme';

export const withTheme: Decorator = (Story, context) => {
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
    direction: {
        name: 'Direction',
        description: 'Text direction',
        defaultValue: 'ltr',
        toolbar: {
            icon: 'paragraph',
            items: ['ltr', 'rtl'],
            dynamicTitle: true,
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
        current: 'light',
        darkClass: 'tw-dark',
        classTarget: 'html',
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
    status: {
        type: 'legacy',
        statuses: {
            released: {
                background: 'rgb(50, 210, 182)',
                color: '#ffffff',
                description: 'This component is stable and released',
            },
            in_progress: {
                background: 'rgb(154, 126, 254)',
                color: '#ffffff',
                description: 'This component is in progress',
            },
            planned: {
                background: 'rgb(254, 194, 50)',
                color: '#ffffff',
                description: 'This component is planned to be revamped',
            },
            legacy: {
                background: 'rgb(129, 132, 132)',
                color: '#ffffff',
                description: 'This is a legacy component',
            },
            deprecated: {
                background: 'rgb(153, 33, 54)',
                color: '#ffffff',
                description: 'This is a legacy component',
            },
        },
    },
};
