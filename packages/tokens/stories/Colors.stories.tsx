/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex } from '@frontify/fondue-components';
import colors from '@frontify/fondue-tokens/json/colors';
import { type Meta, type StoryFn } from '@storybook/react-vite';

import { PreviewConfigWrapper } from './components/PreviewConfigContext';
import { TokenCollectionOverview } from './components/Tokens/TokenCollectionOverview';
import { tokenStoryMeta } from './meta';
import { ColorTokenPreview, getColorTokenClassName } from './previews/ColorToken';

export default {
    title: 'Tokens/Colors',
    ...tokenStoryMeta,
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
