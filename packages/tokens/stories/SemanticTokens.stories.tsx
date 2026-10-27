/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex } from '@frontify/fondue-components';
import semantic from '@frontify/fondue-tokens/json/semantic';
import { type Meta, type StoryFn } from '@storybook/react-vite';

import { PreviewConfigWrapper } from './components/PreviewConfigContext';
import { TokenCollectionOverview } from './components/Tokens/TokenCollectionOverview';
import { tokenStoryMeta } from './meta';
import { SemanticTokenPreview, getSemanticTokenClassName } from './previews/SemanticToken';

export default {
    title: 'Tokens/Semantic Tokens',
    ...tokenStoryMeta,
} as Meta;

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
