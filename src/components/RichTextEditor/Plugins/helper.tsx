/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, ReactNode } from 'react';
import { IconStylingWrapperProps } from './types';

export const IconStylingWrapper = ({ icon }: IconStylingWrapperProps) => (
    <span className="tw-p-2 tw-h-8 tw-justify-center tw-items-center tw-flex">{icon}</span>
);

const buttonRootClassNames =
    'tw-ml-0.5 !tw-text-text-weak hover:!tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded';

export const getButtonClassNames = (isEnabled = true) => ({
    root: isEnabled ? buttonRootClassNames : '!tw-text-text-weak !tw-cursor-not-allowed !tw-opacity-50',
    active: '!tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
});
export const buttonStyles = { root: { width: '24px', height: '24px' } };

export const ButtonWrapper = ({ children, id }: { children: ReactNode; id: string }) => (
    <div data-plugin-id={id}>{children}</div>
);

export const alignmentClassnames: Record<string, string> = {
    left: 'tw-text-left',
    right: 'tw-text-right',
    center: 'tw-text-center',
    justify: 'tw-text-justify',
};

export const justifyClassNames: Record<string, string> = {
    left: 'tw-justify-start tw-text-left',
    center: 'tw-justify-center tw-text-center',
    justify: 'tw-text-justify',
    right: 'tw-justify-end tw-text-right',
};

export const ELEMENT_BUTTON = 'button';

export const THEME_PREFIX = '--f-theme-settings-';
export const getTextStyleCssProperties = (textStyle: string): CSSProperties => {
    if (textStyle === 'p' || !textStyle) {
        textStyle = 'body';
    }

    const style = toKebabCase(textStyle);

    if (style === 'link') {
        return {
            color: `var(${THEME_PREFIX}${style}-color)`,
            fontFamily: `var(${THEME_PREFIX}${style}-font-family)`,
            fontSize: `var(${THEME_PREFIX}${style}-font-size)`,
            fontStyle: `var(${THEME_PREFIX}${style}-font-style)`,
            fontWeight: `var(${THEME_PREFIX}${style}-font-weight)`,
            letterSpacing: `var(${THEME_PREFIX}${style}-letter-spacing)`,
            textDecoration: `var(${THEME_PREFIX}${style}-text-decoration)`,
            textTransform: `var(${THEME_PREFIX}${style}-text-transform)` as CSSProperties['textTransform'],
            marginTop: `var(${THEME_PREFIX}${style}-margin-top)`,
            marginBottom: `var(${THEME_PREFIX}${style}-margin-bottom)`,
        };
    }
    return {
        color: `var(${THEME_PREFIX}${style}-color)`,
        fontFamily: `var(${THEME_PREFIX}${style}-font-family)`,
        fontSize: `var(${THEME_PREFIX}${style}-font-size)`,
        fontStyle: `var(${THEME_PREFIX}${style}-font-style)`,
        fontWeight: `var(${THEME_PREFIX}${style}-font-weight)`,
        letterSpacing: `var(${THEME_PREFIX}${style}-letter-spacing)`,
        lineHeight: `var(${THEME_PREFIX}${style}-line-height)`,
        textDecoration: `var(${THEME_PREFIX}${style}-text-decoration)`,
        textTransform: `var(${THEME_PREFIX}${style}-text-transform)` as CSSProperties['textTransform'],
        marginTop: `var(${THEME_PREFIX}${style}-margin-top)`,
        marginBottom: `var(${THEME_PREFIX}${style}-margin-bottom)`,
    };
};
const toKebabCase = (str: string) => str.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
