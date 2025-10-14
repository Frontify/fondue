/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex } from '@frontify/fondue-components';
import { type Meta, type StoryFn } from '@storybook/react-vite';

import colors from '@frontify/fondue-tokens/json/colors';
import semantic from '@frontify/fondue-tokens/json/semantic';

import { PreviewConfigWrapper } from './components/PreviewConfigContext';
import { TokenCollectionOverview } from './components/Tokens/TokenCollectionOverview';
import { ColorTokenPreview, getColorTokenClassName } from './previews/ColorToken';
import { SemanticTokenPreview, getSemanticTokenClassName } from './previews/SemanticToken';

export default {
    title: 'Tokens',
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

export const Colors: StoryFn = ({ textContent, removeTailwindPrefix }) => {
    return (
        <PreviewConfigWrapper
            textContent={textContent as string}
            removeTailwindPrefix={removeTailwindPrefix as boolean}
        >
            <Flex direction="column" gap={8}>
                <h1 className="tw-heading-xx-large tw-text-primary">Colors</h1>
                <TokenCollectionOverview
                    tokens={colors}
                    tokenPreview={ColorTokenPreview}
                    getClassName={getColorTokenClassName}
                />
            </Flex>
        </PreviewConfigWrapper>
    );
};

export const SemanticTokens: StoryFn = ({ textContent, removeTailwindPrefix }) => {
    return (
        <PreviewConfigWrapper
            textContent={textContent as string}
            removeTailwindPrefix={removeTailwindPrefix as boolean}
        >
            <Flex direction="column" gap={4}>
                <h1 className="tw-heading-xx-large tw-text-primary">Semantic Tokens</h1>
                <TokenCollectionOverview
                    tokens={semantic}
                    tokenPreview={SemanticTokenPreview}
                    getClassName={getSemanticTokenClassName}
                />
            </Flex>
        </PreviewConfigWrapper>
    );
};
