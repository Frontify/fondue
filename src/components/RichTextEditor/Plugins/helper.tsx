/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, ReactNode } from 'react';
import { ButtonGroupProps, IconStylingWrapperProps } from './types';
import { RichTextButtonStyle } from './ButtonPlugin';

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

export const getTextStyleCssProperties = (textStyle: string): any => {
    if (textStyle === 'link') {
        return {
            color: `var(--f-theme-settings-${textStyle}-color)`,
            fontFamily: `var(--f-theme-settings-${textStyle}-font-family)`,
            fontStyle: `var(--f-theme-settings-${textStyle}-font-style)`,
            fontWeight: `var(--f-theme-settings-${textStyle}-font-weight)`,
            letterSpacing: `var(--f-theme-settings-${textStyle}-letter-spacing)`,
            lineHeight: `var(--f-theme-settings-${textStyle}-line-height)`,
            textDecoration: `var(--f-theme-settings-${textStyle}-text-decoration)`,
            textTransform: `var(--f-theme-settings-${textStyle}-text-transform)`,
        };
    }
    return {
        color: `var(--f-theme-settings-${textStyle}-color)`,
        fontFamily: `var(--f-theme-settings-${textStyle}-font-family)`,
        fontSize: `var(--f-theme-settings-${textStyle}-font-size)`,
        fontStyle: `var(--f-theme-settings-${textStyle}-font-style)`,
        fontWeight: `var(--f-theme-settings-${textStyle}-font-weight)`,
        letterSpacing: `var(--f-theme-settings-${textStyle}-letter-spacing)`,
        lineHeight: `var(--f-theme-settings-${textStyle}-line-height)`,
        textDecoration: `var(--f-theme-settings-${textStyle}-text-decoration)`,
        textTransform: `var(--f-theme-settings-${textStyle}-text-transform)` as CSSProperties['textTransform'],
    };
};

export const getButtonStyleCssProperties = (
    buttonStyle: RichTextButtonStyle,
): CSSProperties & { hover: CSSProperties } => {
    const styles = {
        fontSize: `var(--f-theme-settings-button-${buttonStyle}-font-size)`,
        color: `var(--f-theme-settings-button-${buttonStyle}-color)`,
        paddingTop: `var(--f-theme-settings-button-${buttonStyle}-padding-top)`,
        paddingRight: `var(--f-theme-settings-button-${buttonStyle}-padding-right)`,
        paddingBottom: `var(--f-theme-settings-button-${buttonStyle}-padding-bottom)`,
        paddingLeft: `var(--f-theme-settings-button-${buttonStyle}-padding-left)`,
        fontFamily: `var(--f-theme-settings-button-${buttonStyle}-font-family)`,
        fontStyle: `var(--f-theme-settings-button-${buttonStyle}-font-style)`,
        fontWeight: `var(--f-theme-settings-button-${buttonStyle}-font-weight)`,
        textTransform: `var(--f-theme-settings-button-${buttonStyle}-text-transform)` as CSSProperties['textTransform'],
        lineHeight: `var(--f-theme-settings-button-${buttonStyle}-line-height)`,
        borderColor: `var(--f-theme-settings-button-${buttonStyle}-border-color)`,
        borderWidth: `var(--f-theme-settings-button-${buttonStyle}-border-width)`,
        borderRadius: `var(--f-theme-settings-button-${buttonStyle}-border-radius)`,
        backgroundColor: `var(--f-theme-settings-button-${buttonStyle}-background-color)`,
        hover: {
            color: `var(--f-theme-settings-button-${buttonStyle}-hover-color)`,
            borderColor: `var(--f-theme-settings-button-${buttonStyle}-hover-border-color)`,
            backgroundColor: `var(--f-theme-settings-button-${buttonStyle}-hover-background-color)`,
        },
    };
    return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
};
