/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TextareaField as TextareaFieldComponent, TextareaFieldProps } from './TextareaField';
import { action } from '@storybook/addon-actions';
import { IconIcon16 } from '@foundation/Icon/Generated';
import { BrightHeaderStyle } from '@components/Tooltip';
import { textareaFieldArgTypes, textareaFieldArgs } from './helpers/constants';

export default {
    title: 'Components/TextareaField',
    component: TextareaFieldComponent,
    tags: ['autodocs'],
    args: textareaFieldArgs,
    argTypes: textareaFieldArgTypes,
} as Meta<TextareaFieldProps>;

const TextareaFieldTemplate: StoryFn<TextareaFieldProps> = (args: TextareaFieldProps) => {
    const [input, setInput] = useState('');
    useEffect(() => setInput(`${args.value ?? ''}`), [args.value]);

    return <TextareaFieldComponent {...args} value={input} onInput={setInput} />;
};

export const TextareaField = TextareaFieldTemplate.bind({});

export const WithDecorator = TextareaFieldTemplate.bind({});
WithDecorator.args = {
    decorator: <IconIcon16 />,
};

export const WithExtraActions = TextareaFieldTemplate.bind({});
WithExtraActions.args = {
    extraActions: [
        {
            onClick: action('onExtraAction1Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 1',
        },
        {
            onClick: action('onExtraAction2Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 2',
        },
    ],
};

export const WithDisabledExtraAction = TextareaFieldTemplate.bind({});
WithDisabledExtraAction.args = {
    extraActions: [
        {
            onClick: action('onExtraAction1Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 1',
        },
        {
            onClick: action('onExtraAction2Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 2',
            disabled: true,
        },
    ],
};

export const WithExtraActionsWithTooltips = TextareaFieldTemplate.bind({});
WithExtraActionsWithTooltips.args = {
    extraActions: [
        {
            onClick: action('onExtraAction1Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 1',
            tooltip: {
                content: 'Tooltip content',
                withArrow: true,
            },
        },
        {
            onClick: action('onExtraAction2Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 2',
            tooltip: {
                content: 'Tooltip content 2',
                brightHeader: BrightHeaderStyle.Warning,
                withArrow: true,
            },
        },
    ],
};

export const WithDecoratorAndExtraActions = TextareaFieldTemplate.bind({});
WithDecorator.args = {
    decorator: <IconIcon16 />,
    extraActions: [
        {
            onClick: action('onExtraAction1Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 1',
            tooltip: {
                content: 'Tooltip content',
                withArrow: true,
            },
        },
        {
            onClick: action('onExtraAction2Click'),
            icon: <IconIcon16 />,
            title: 'Extra Action 2',
            tooltip: {
                content: 'Tooltip content 2',
                brightHeader: BrightHeaderStyle.Warning,
                withArrow: true,
            },
        },
    ],
};
