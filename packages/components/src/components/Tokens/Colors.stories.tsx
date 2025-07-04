/* (c) Copyright Frontify Ltd., all rights reserved. */

import colors from '@frontify/fondue-tokens/json/colors';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { TokenList, type Token } from './TokenList';

export default {
    title: 'Tokens/Colors',
} as Meta;

const getTokenPreview = ({ identifier, value, name }: Token) => {
    return <div style={{ backgroundColor: value }}></div>;
};

export const Default: StoryFn = () => {
    return (
        <Flex direction="column" gap={8}>
            <h1 className="tw-heading-xx-large tw-text-surface-on-surface">Colors</h1>
            <Flex direction="column" gap={8}>
                <TokenList tokens={colors} getTokenPreview={getTokenPreview} />
            </Flex>
        </Flex>
    );
};
