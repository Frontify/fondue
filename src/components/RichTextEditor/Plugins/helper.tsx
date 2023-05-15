/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, ReactNode } from 'react';
import { ButtonGroupProps, IconStylingWrapperProps } from './types';
import { RichTextButtonStyle } from './ButtonPlugin';
import { TElement } from '@udecode/plate';

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

export const ButtonGroupWrapper = ({ index, children }: ButtonGroupProps) => (
    <div data-test-id={`toolbar-group-${index}`} className="tw-flex tw-items-center tw-h-9 tw-p-2">
        {children}
    </div>
);

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

const PREFIX = '--f-theme-settings-';
export const getTextStyleCssProperties = (textStyle: string): CSSProperties => {
    if (textStyle === 'undefined') {
        return {};
    }
    if (textStyle === 'p') {
        textStyle = 'body';
    }

    if (textStyle === 'link') {
        return {
            color: `var(${PREFIX}${textStyle}-color)`,
            fontFamily: `var(${PREFIX}${textStyle}-font-family)`,
            fontSize: `var(${PREFIX}${textStyle}-font-size)`,
            fontStyle: `var(${PREFIX}${textStyle}-font-style)`,
            fontWeight: `var(${PREFIX}${textStyle}-font-weight)`,
            letterSpacing: `var(${PREFIX}${textStyle}-letter-spacing)`,
            textDecoration: `var(${PREFIX}${textStyle}-text-decoration)`,
            textTransform: `var(${PREFIX}${textStyle}-text-transform)` as CSSProperties['textTransform'],
        };
    }
    return {
        color: `var(${PREFIX}${textStyle}-color)`,
        fontFamily: `var(${PREFIX}${textStyle}-font-family)`,
        fontSize: `var(${PREFIX}${textStyle}-font-size)`,
        fontStyle: `var(${PREFIX}${textStyle}-font-style)`,
        fontWeight: `var(${PREFIX}${textStyle}-font-weight)`,
        letterSpacing: `var(${PREFIX}${textStyle}-letter-spacing)`,
        lineHeight: `var(${PREFIX}${textStyle}-line-height)`,
        textDecoration: `var(${PREFIX}${textStyle}-text-decoration)`,
        textTransform: `var(${PREFIX}${textStyle}-text-transform)` as CSSProperties['textTransform'],
    };
};

export const getButtonStyleCssProperties = (
    buttonStyle: RichTextButtonStyle,
): CSSProperties & { hover: CSSProperties } => {
    const styles = {
        fontSize: `var(${PREFIX}button-${buttonStyle}-font-size)`,
        color: `var(${PREFIX}button-${buttonStyle}-color)`,
        paddingTop: `var(${PREFIX}button-${buttonStyle}-padding-top)`,
        paddingRight: `var(${PREFIX}button-${buttonStyle}-padding-right)`,
        paddingBottom: `var(${PREFIX}button-${buttonStyle}-padding-bottom)`,
        paddingLeft: `var(${PREFIX}button-${buttonStyle}-padding-left)`,
        fontFamily: `var(${PREFIX}button-${buttonStyle}-font-family)`,
        fontStyle: `var(${PREFIX}button-${buttonStyle}-font-style)`,
        fontWeight: `var(${PREFIX}button-${buttonStyle}-font-weight)`,
        textTransform: `var(${PREFIX}button-${buttonStyle}-text-transform)` as CSSProperties['textTransform'],
        lineHeight: `var(${PREFIX}button-${buttonStyle}-line-height)`,
        borderColor: `var(${PREFIX}button-${buttonStyle}-border-color)`,
        borderWidth: `var(${PREFIX}button-${buttonStyle}-border-width)`,
        borderRadius: `var(${PREFIX}button-${buttonStyle}-border-radius)`,
        backgroundColor: `var(${PREFIX}button-${buttonStyle}-background-color)`,
        hover: {
            color: `var(${PREFIX}button-${buttonStyle}-hover-color)`,
            borderColor: `var(${PREFIX}button-${buttonStyle}-hover-border-color)`,
            backgroundColor: `var(${PREFIX}button-${buttonStyle}-hover-background-color)`,
        },
    };
    return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
};

export const getLiStyles = (element: TElement): CSSProperties => {
    return {
        ...getTextStyleCssProperties(getDeepestTextStyle(element)),
        counterIncrement: 'count',
    };
};

const getDeepestTextStyle = (node: TElement): string => {
    let deepestTextStyle;

    if (node.type === 'a') {
        deepestTextStyle = node.children[0].textStyle;
    } else if (node.children) {
        for (const childNode of node.children) {
            const childDeepestTextStyle = getDeepestTextStyle(childNode as TElement);
            if (childDeepestTextStyle) {
                if (!deepestTextStyle || childDeepestTextStyle.startsWith(deepestTextStyle)) {
                    deepestTextStyle = childDeepestTextStyle;
                }
            }
        }
    } else {
        deepestTextStyle = node.textStyle;
    }

    return deepestTextStyle as string;
};

export enum ButtonStyles {
    ELEMENT_BUTTON_PRIMARY = 'buttonPrimary',
    ELEMENT_BUTTON_SECONDARY = 'buttonSecondary',
    ELEMENT_BUTTON_TERTIARY = 'buttonTertiary',
}
