/* (c) Copyright Frontify Ltd., all rights reserved. */

import semantic from '@frontify/fondue-tokens/json/semantic';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { TokenList, type Token } from './TokenList';

export default {
    title: 'Tokens/Semantic Tokens',
} as Meta;

const getTokenPreview = ({ identifier, value, name, path }: Token) => {
    if (path.includes('font-family')) {
        return (
            <div
                style={{ fontFamily: value }}
                className="tw-text-small tw-flex tw-items-center tw-justify-center tw-h-full"
            >
                Hello World!
            </div>
        );
    }

    if (path.includes('font-weight')) {
        return (
            <div
                style={{ fontWeight: value }}
                className="tw-text-small tw-flex tw-items-center tw-justify-center tw-h-full"
            >
                Hello World!
            </div>
        );
    }

    if (path.includes('font-size')) {
        return (
            <div style={{ fontSize: value }} className="tw-flex tw-items-center tw-justify-center tw-h-full">
                Hello World!
            </div>
        );
    }

    if (path.includes('letter-spacing')) {
        return (
            <div style={{ letterSpacing: value }} className="tw-flex tw-items-center tw-justify-center tw-h-full">
                Hello World!
            </div>
        );
    }

    if (path.includes('line-height')) {
        return (
            <div style={{ lineHeight: value }} className="tw-flex tw-items-center tw-justify-center tw-h-full">
                Hello World! <br />
                Hello World!
            </div>
        );
    }

    if (path.includes('spacing')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div style={{ marginRight: value }} className="tw-h-10 tw-w-10 tw-bg-highlight "></div>
                <div className="tw-h-10 tw-w-10 tw-bg-highlight "></div>
            </div>
        );
    }

    if (path.includes('border-radius')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div style={{ borderRadius: value }} className="tw-h-10 tw-w-10 tw-bg-highlight"></div>
            </div>
        );
    }

    if (path.includes('border-width')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div style={{ borderWidth: value }} className="tw-h-10 tw-w-10 tw-border-highlight"></div>
            </div>
        );
    }

    if (path.includes('shadow')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div style={{ boxShadow: value }} className="tw-h-10 tw-w-10 "></div>
            </div>
        );
    }

    return <div style={{ backgroundColor: value }}></div>;
};

export const Default: StoryFn = () => {
    return (
        <Flex direction="column" gap={8}>
            <h1 className="tw-heading-xx-large tw-text-surface-on-surface">Semantic Tokens</h1>
            <Flex direction="column" gap={8}>
                <TokenList tokens={semantic} getTokenPreview={getTokenPreview} />
            </Flex>
        </Flex>
    );
};
