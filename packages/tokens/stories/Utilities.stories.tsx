/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex } from '@frontify/fondue-components';
import { type Meta, type StoryFn } from '@storybook/react-vite';

import utilities from '@frontify/fondue-tokens/json/utilities';

import { customUtilities } from '../src/static/customUtilities';

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
    parameters: {
        status: {
            type: 'released',
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
                <h2 className="tw-heading-x-large tw-text-primary">Typography</h2>

                <UtilityCollectionOverview
                    utilities={utilities.text}
                    getUtilityPreview={UtilityPreview}
                    getClassName={getUtilityClassName}
                />
            </Flex>
        </PreviewConfigWrapper>
    );
};

export const Custom: StoryFn = ({ textContent, removeTailwindPrefix }) => {
    return (
        <PreviewConfigWrapper
            textContent={textContent as string}
            removeTailwindPrefix={removeTailwindPrefix as boolean}
        >
            <Flex direction="column" gap={4}>
                <UsageInfo>
                    Easily apply common, token-based styles with a single class.
                    <br />
                    <br />
                    <b>Only available when using Fondue with Tailwind CSS.</b>
                </UsageInfo>
                <h2 className="tw-heading-x-large tw-text-primary">Custom</h2>

                <UtilityCollectionOverview
                    utilities={customUtilities.custom}
                    getUtilityPreview={UtilityPreview}
                    getClassName={getUtilityClassName}
                />
            </Flex>
        </PreviewConfigWrapper>
    );
};
