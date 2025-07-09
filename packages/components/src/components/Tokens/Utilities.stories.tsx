/* (c) Copyright Frontify Ltd., all rights reserved. */

import utilities from '@frontify/fondue-tokens/json/utilities';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { PreviewConfigWrapper } from './components/PreviewConfigContext';
import { UsageInfo } from './components/UsageInfo';
import { UtilityCollectionOverview } from './components/Utilities/UtilityCollectionOverview';
import { UtilityPreview, getUtilityClassName } from './previews/Utility';

export default {
    title: 'Utilities',
    args: {
        textContent: 'Hello World!',
        removeTailwindPrefix: false,
    },
    argTypes: {
        textContent: {
            control: { type: 'text' },
        },
        removeTailwindPrefix: {
            description: 'Remove the frontify tailwind prefix (tw-) from the twailwind class name',
            control: { type: 'boolean' },
        },
    },
} as Meta;

export const Typography: StoryFn = ({ textContent, removeTailwindPrefix }) => {
    return (
        <PreviewConfigWrapper
            textContent={textContent as string}
            removeTailwindPrefix={removeTailwindPrefix as boolean}
        >
            <Flex direction="column" gap={4}>
                <UsageInfo>
                    Easily apply common, token-based styles with a single class. Our utilities bundle text styles for
                    each typography variant.
                    <br />
                    <br />
                    <b>Only available when using Fondue with Tailwind CSS.</b>
                </UsageInfo>
                <h2 className="tw-heading-x-large tw-text-surface-on-surface">Typography</h2>

                <UtilityCollectionOverview
                    utilities={utilities.text}
                    getUtilityPreview={UtilityPreview}
                    getClassName={getUtilityClassName}
                />
            </Flex>
        </PreviewConfigWrapper>
    );
};
