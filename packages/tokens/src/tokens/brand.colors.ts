/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * IMPORTANT
 * None of these tokens should be exported for use by design system adopters.
 * They are simply a palette of the values we use that make up out brand.
 */
module.exports = {
    color: {
        // PRIMARY
        'off-white': { value: '#FAFAFA' },
        charcoal: { value: '#2D3232' },
        'warm-grey': { value: '#E6DCDC' },
        'disabled-dark': { value: '#A5A8A8' },

        grey: {
            '0': { value: '#FFFFFF' },
            '5': { value: '{color.off-white.value}' },
            '10': { value: '#f1f1f1' },
            '20': { value: '#EAEBEB' },
            '30': { value: '#D5D6D6' },
            '40': { value: '#ABADAD' },
            '50': { value: '#818484' },
            '60': { value: '#6C7070' },
            '70': { value: '#424747' },
            '80': { value: '{color.charcoal.value}' },
            '90': { value: '#1a1c1c' },
            '100': { value: '#080808' },
        },

        violet: {
            bright: { value: '#825FFF' },
            mid: { value: '#9088FF' },
            pastel: { value: '#C8D1ED' },
            '10': { value: '#F0EAFA' },
            '20': { value: '#E4DAFA' },
            '30': { value: '#CBBBFB' },
            '40': { value: '#B39DFD' },
            '50': { value: '#9A7EFE' },
            '60': { value: '#7C57FF' },
            '70': { value: '#7159D7' },
            '80': { value: '#6449C4' },
            '90': { value: '#564996' },
            '100': { value: '#443185' },
        },

        red: {
            bright: { value: '#FF375A' },
            mid: { value: '#FF8066' },
            pastel: { value: '#E1C4BE' },
            '10': { value: '#FCE6E9' },
            '20': { value: '#FDD2D9' },
            '30': { value: '#FDABB9' },
            '40': { value: '#FE8EA2' },
            '50': { value: '#FE5E7A' },
            '60': { value: '{color.red.bright.value}' },
            '70': { value: '#ED3354' },
            '80': { value: '#D92F4C' },
            '90': { value: '#992136' },
            '100': { value: '#57282B' },
        },

        green: {
            bright: { value: '#00C8A5' },
            mid: { value: '#80DBB7' },
            pastel: { value: '#BEE1D4' },
            '10': { value: '#E3F4F1' },
            '20': { value: '#CAEFE8' },
            '30': { value: '#97E5D7' },
            '40': { value: '#65DCC7' },
            '50': { value: '#32D2B6' },
            '60': { value: '{color.green.bright.value}' },
            '70': { value: '#05B999' },
            '80': { value: '#15816F' },
            '90': { value: '#1B6E60' },
            '100': { value: '#2E4F46' },
        },

        yellow: {
            bright: { value: '#FFB400' },
            mid: { value: '#EEC779' },
            pastel: { value: '#E1D4BE' },
            '10': { value: '#FCF2E0' },
            '20': { value: '#FDEBC7' },
            '30': { value: '#FDDD95' },
            '40': { value: '#FED064' },
            '50': { value: '#FEC232' },
            '60': { value: '{color.yellow.bright.value}' },
            '70': { value: '#E5A200' },
            '80': { value: '#966A00' },
            '90': { value: '#664800' },
            '100': { value: '#4C3600' },
        },
    },
};
