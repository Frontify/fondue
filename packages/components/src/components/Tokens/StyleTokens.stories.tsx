/* (c) Copyright Frontify Ltd., all rights reserved. */

import semantic from '@frontify/fondue-tokens/json/semantic';
import { type Meta, type StoryFn } from '@storybook/react';

import { Flex } from '../Flex/Flex';

import { TokenList, type Token } from './TokenList';
import { PreviewWrapper, useTokenPreview } from './components/PreviewWrapper';

export default {
    title: 'Tokens/Semantic Tokens',
} as Meta;

const getClassName = ({ name, path }: Token) => {
    if (path.includes('font-family')) {
        return `font-${name.replace('typography-font-family-', '')}`;
    }

    if (path.includes('font-weight')) {
        return `font-${name.replace('typography-font-weight-', '')}`;
    }

    if (path.includes('font-size')) {
        return `text-${name.replace('typography-font-size-', '')}`;
    }

    if (path.includes('letter-spacing')) {
        return `ttracking-${name.replace('typography-letter-spacing-', '')}`;
    }

    if (path.includes('line-height')) {
        return `leading-${name.replace('typography-line-height-', '')}`;
    }

    if (path.includes('text-transform')) {
        return `uppercase-${name.replace('typography-text-transform-', '')}`;
    }

    if (path.includes('spacing')) {
        return `*-${name.replace('spacing-', '')}`;
    }

    if (path.includes('border-radius')) {
        return `rounded-${name.replace('border-radius-', '')}`;
    }

    if (path.includes('border-width')) {
        return `border-${name.replace('border-width-', '')}`;
    }

    if (path.includes('shadow')) {
        return `shadow-${name.replace('shadow-', '')}`;
    }

    return '';
};

const getTokenPreview = ({ value, path }: Token) => {
    const { textContent } = useTokenPreview();
    if (path.includes('font-family')) {
        return (
            <div
                style={{ fontFamily: value }}
                className="tw-text-small tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
            >
                {textContent}
            </div>
        );
    }

    if (path.includes('font-weight')) {
        return (
            <div
                style={{ fontWeight: value }}
                className="tw-text-small tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
            >
                {textContent}
            </div>
        );
    }

    if (path.includes('font-size')) {
        return (
            <div style={{ fontSize: value }} className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full">
                {textContent}
            </div>
        );
    }

    if (path.includes('letter-spacing')) {
        return (
            <div
                style={{ letterSpacing: value }}
                className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
            >
                {textContent}
            </div>
        );
    }

    if (path.includes('line-height')) {
        return (
            <div
                style={{ lineHeight: value }}
                className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
            >
                {textContent} <br />
                {textContent}
            </div>
        );
    }

    if (path.includes('text-transform')) {
        return (
            <div
                style={{ textTransform: value as 'uppercase' | 'lowercase' | 'capitalize' }}
                className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
            >
                {textContent}
            </div>
        );
    }

    if (path.includes('spacing')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full">
                <div style={{ marginRight: value }} className="tw-h-10 tw-w-10 tw-bg-highlight "></div>
                <div className="tw-h-10 tw-w-10 tw-bg-highlight "></div>
            </div>
        );
    }

    if (path.includes('border-radius')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full">
                <div style={{ borderRadius: value }} className="tw-h-10 tw-w-10 tw-bg-highlight"></div>
            </div>
        );
    }

    if (path.includes('border-width')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full">
                <div style={{ borderWidth: value }} className="tw-h-10 tw-w-10 tw-border-highlight"></div>
            </div>
        );
    }

    if (path.includes('shadow')) {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full">
                <div className="tw-shadow-mid tw-shadow-highlight tw-h-10 tw-w-10 "></div>
            </div>
        );
    }

    return <div style={{ backgroundColor: value }}></div>;
};

export const Default: StoryFn = () => {
    return (
        <PreviewWrapper header="Semantic Tokens">
            <Flex direction="column" gap={8}>
                <TokenList tokens={semantic} getTokenPreview={getTokenPreview} getClassName={getClassName} />
            </Flex>
        </PreviewWrapper>
    );
};
