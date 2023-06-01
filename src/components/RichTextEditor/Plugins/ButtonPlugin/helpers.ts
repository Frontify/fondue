/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { RichTextButtonStyle } from './types';
import { THEME_PREFIX } from '../helper';

export const getButtonStyleCssProperties = (
    buttonStyle: RichTextButtonStyle,
): CSSProperties & { hover: CSSProperties } => {
    const styles = {
        fontSize: `var(${THEME_PREFIX}button-${buttonStyle}-font-size)`,
        color: `var(${THEME_PREFIX}button-${buttonStyle}-color)`,
        paddingTop: `var(${THEME_PREFIX}button-${buttonStyle}-padding-top)`,
        paddingRight: `var(${THEME_PREFIX}button-${buttonStyle}-padding-right)`,
        paddingBottom: `var(${THEME_PREFIX}button-${buttonStyle}-padding-bottom)`,
        paddingLeft: `var(${THEME_PREFIX}button-${buttonStyle}-padding-left)`,
        fontFamily: `var(${THEME_PREFIX}button-${buttonStyle}-font-family)`,
        fontStyle: `var(${THEME_PREFIX}button-${buttonStyle}-font-style)`,
        fontWeight: `var(${THEME_PREFIX}button-${buttonStyle}-font-weight)`,
        textTransform: `var(${THEME_PREFIX}button-${buttonStyle}-text-transform)` as CSSProperties['textTransform'],
        lineHeight: `var(${THEME_PREFIX}button-${buttonStyle}-line-height)`,
        borderColor: `var(${THEME_PREFIX}button-${buttonStyle}-border-color)`,
        borderWidth: `var(${THEME_PREFIX}button-${buttonStyle}-border-width)`,
        borderRadius: `var(${THEME_PREFIX}button-${buttonStyle}-border-radius)`,
        backgroundColor: `var(${THEME_PREFIX}button-${buttonStyle}-background-color)`,
        hover: {
            color: `var(${THEME_PREFIX}button-${buttonStyle}-hover-color)`,
            borderColor: `var(${THEME_PREFIX}button-${buttonStyle}-hover-border-color)`,
            backgroundColor: `var(${THEME_PREFIX}button-${buttonStyle}-hover-background-color)`,
        },
    };
    return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
};
