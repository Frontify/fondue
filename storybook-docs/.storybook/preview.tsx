/* (c) Copyright Frontify Ltd., all rights reserved. */

export const parameters = {
    options: {
        storySort: {
            order: ['Tokens', 'Foundation', 'Layout', 'Typography', 'Components'],
        },
    },
    layout: 'fullscreen',
    outline: {
        disable: true,
    },
    status: {
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
export const globalTypes = {
    theme: {
        description: 'Global theme for components',
        toolbar: {
            title: 'Theme',
            icon: 'paintbrush',
            items: [
                {
                    value: 'light',
                    title: 'Light Theme',
                    icon: 'sun',
                },
                {
                    value: 'dark',
                    title: 'Dark Theme',
                    icon: 'moon',
                },
                {
                    value: 'both',
                    title: 'Both Themes',
                    icon: 'contrast',
                },
            ],
            dynamicTitle: true,
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

export const initialGlobals = {
    theme: 'light',
};
