/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { LinkChooser as LinkChooserComponent } from './LinkChooser';
import { data } from './mock/data';
import { extraSections } from './sections';
import { LinkChooserProps, SearchResult } from './types';
import { doesContainSubstring } from './utils/helpers';

export default {
    title: 'Components/Link Chooser',
    component: LinkChooserComponent,
    tags: ['autodocs'],
    args: {
        placeholder: 'https://example.com',
        disabled: false,
        clearable: false,
        required: true,
        validation: Validation.Default,
    },
    argTypes: {
        onLinkChange: { action: 'onLinkChange' },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
    },
} as Meta<LinkChooserProps>;

const getGlobalByQueryMock = (query: string): Promise<SearchResult[]> =>
    new Promise((resolve) =>
        setTimeout(
            () => {
                resolve(data.filter((item) => doesContainSubstring(item.title, query, extraSections)));
            },
            Math.floor(Math.random() * 2000),
        ),
    );

export const LinkChooser: StoryFn<LinkChooserProps> = (args: LinkChooserProps) => {
    const [openInNewTab, setOpenInNewTab] = useState<boolean>(false);

    return (
        <LinkChooserComponent
            {...args}
            getGlobalByQuery={getGlobalByQueryMock}
            extraSections={extraSections}
            openInNewTab={openInNewTab}
            label="URL"
            onOpenInNewTabChange={setOpenInNewTab}
        />
    );
};
