/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePreviewConfig } from '../components/PreviewConfigContext';
import { type Token } from '../components/Tokens/types';

export const getSemanticTokenClassName = ({ name, path }: Token) => {
    if (path.includes('font-family')) {
        return `${name.replace('typography-font-family-', 'font-').replace('-default', '')}`;
    }

    if (path.includes('font-weight')) {
        return `${name.replace('typography-font-weight-', 'font-').replace('-default', '')}`;
    }

    if (path.includes('font-size')) {
        return `${name.replace('typography-font-size-', 'text-').replace('-default', '')}`;
    }

    if (path.includes('letter-spacing')) {
        return `${name.replace('typography-letter-spacing-', 'tracking-').replace('-default', '')}`;
    }

    if (path.includes('line-height')) {
        return `${name.replace('typography-line-height-', 'leading-').replace('-default', '')}`;
    }

    if (path.includes('text-transform')) {
        return `${name.replace('typography-text-transform-', '').replace('default', 'normal-case')}`;
    }

    if (path.includes('spacing')) {
        return `${name.replace('spacing-', '*-').replace('-default', '')}`;
    }

    if (path.includes('border-radius')) {
        return `${name.replace('border-radius-', 'rounded-').replace('-default', '')}`;
    }

    if (path.includes('border-width')) {
        return `${name.replace('border-width-', 'border-').replace('-default', '')}`;
    }

    if (path.includes('shadow')) {
        return `${name.replace('-default', '')}`;
    }

    return '';
};

export const SemanticTokenPreview = ({ value, path }: Token) => {
    const { textContent } = usePreviewConfig();

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
                <div style={{ boxShadow: value }} className="tw-h-10 tw-w-10 "></div>
            </div>
        );
    }

    return <div style={{ backgroundColor: value }}></div>;
};
