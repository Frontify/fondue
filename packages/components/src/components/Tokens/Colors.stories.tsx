/* (c) Copyright Frontify Ltd., all rights reserved. */

import colors from '@frontify/fondue-tokens/json/colors';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { TokenList, type Token } from './TokenList';
import { PreviewWrapper } from './components/PreviewWrapper';

export default {
    title: 'Tokens/Colors',
} as Meta;

const getTokenPreview = ({ value }: Token) => {
    return <div style={{ backgroundColor: value }} className=" tw-w-full tw-h-full"></div>;
};

const getClassName = ({ name }: Token) => {
    return `*-${name.replace('color-', '').replace('-default', '')}`;
};

export const Default: StoryFn = () => {
    return (
        <PreviewWrapper header="Colors">
            <Flex direction="column" gap={8}>
                <TokenList tokens={colors} getTokenPreview={getTokenPreview} getClassName={getClassName} />
            </Flex>
        </PreviewWrapper>
    );
};
