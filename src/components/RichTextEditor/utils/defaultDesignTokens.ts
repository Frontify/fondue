/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens } from '../types';

export const defaultDesignTokens: DesignTokens = {
    heading1: {
        fontSize: '48px',
        fontWeight: 700,
    },
    heading2: {
        fontSize: '32px',
        fontWeight: 700,
    },
    heading3: {
        fontSize: '24px',
    },
    heading4: {
        fontSize: '18px',
    },
    custom1: {
        fontSize: '14px',
    },
    custom2: {
        fontSize: '14px',
        fontWeight: 600,
    },
    custom3: {
        fontSize: '14px',
        textDecoration: 'underline',
    },
    quote: {
        fontSize: '16px',
        fontStyle: 'italic',
    },
    link: {
        fontSize: '14px',
        color: 'rgb(113, 89, 215)',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    button_primary: {
        fontSize: '13px',
        color: 'rgb(255, 255, 255)',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        fontFamily: 'inherit',
        fontStyle: '',
        fontWeight: 400,
        textTransform: 'none',
        hover: {
            color: 'rgb(255, 255, 255)',
            borderColor: 'rgb(50, 0, 236)',
            backgroundColor: 'rgb(61, 7, 255)',
        },
        lineHeight: '1.3',
        borderColor: 'rgb(102, 60, 255)',
        borderWidth: '2px',
        borderRadius: '5px',
        backgroundColor: 'rgb(130, 95, 255)',
    },
    button_secondary: {
        fontSize: '13px',
        color: 'rgb(102, 102, 102)',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        fontFamily: 'inherit',
        fontStyle: '',
        fontWeight: 400,
        textTransform: 'none',
        hover: {
            color: 'rgb(76, 76, 76)',
            borderColor: 'rgb(155, 155, 155)',
            backgroundColor: 'rgb(172, 172, 172)',
        },
        lineHeight: '1.3',
        borderColor: 'rgb(207, 207, 207)',
        borderWidth: '2px',
        borderRadius: '5px',
        backgroundColor: 'rgb(230, 230, 230)',
    },
    button_tertiary: {
        fontSize: '13px',
        color: 'rgb(102, 60, 255)',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        fontFamily: 'inherit',
        fontStyle: '',
        fontWeight: 400,
        textTransform: 'none',
        hover: {
            color: 'rgb(53, 0, 244)',
            borderColor: 'rgb(61, 7, 255)',
            backgroundColor: 'rgb(255, 255, 255)',
        },
        lineHeight: '1.3',
        borderColor: 'rgb(130, 95, 255)',
        borderWidth: '2px',
        borderRadius: '5px',
        backgroundColor: 'rgb(255, 255, 255)',
    },
};
