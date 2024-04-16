/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    box: {
        // Neutral
        'neutral-color': { value: '{color.grey.70.value}', attributes: { category: 'color' } },
        'neutral-color-hover': { value: '{color.grey.60.value}', attributes: { category: 'color' } },
        'neutral-color-pressed': { value: '{color.grey.100.value}', attributes: { category: 'color' } },
        'neutral-inverse-color': { value: '{color.grey.0.value}', attributes: { category: 'color' } },
        'neutral-inverse-color-hover': { value: '{color.grey.20.value}', attributes: { category: 'color' } },
        'neutral-inverse-color-pressed': { value: '{color.grey.30.value}', attributes: { category: 'color' } },

        'neutral-strong-color': { value: '{color.grey.0.value}', attributes: { category: 'color' } },
        'neutral-strong-color-hover': { value: '{color.grey.10.value}', attributes: { category: 'color' } },
        'neutral-strong-color-pressed': { value: '{color.grey.20.value}', attributes: { category: 'color' } },
        'neutral-strong-inverse-color': { value: '{color.grey.80.value}', attributes: { category: 'color' } },
        'neutral-strong-inverse-color-hover': { value: '{color.grey.90.value}', attributes: { category: 'color' } },
        'neutral-strong-inverse-color-pressed': { value: '{color.grey.100.value}', attributes: { category: 'color' } },

        'neutral-mighty-color': { value: '{color.grey.0.value}', attributes: { category: 'color' } },
        'neutral-mighty-color-hover': { value: '{color.grey.10.value}', attributes: { category: 'color' } },
        'neutral-mighty-color-pressed': { value: '{color.grey.20.value}', attributes: { category: 'color' } },
        'neutral-mighty-inverse-color': { value: '{color.grey.100.value}', attributes: { category: 'color' } },
        'neutral-mighty-inverse-color-hover': { value: '{color.grey.100.value}', attributes: { category: 'color' } },
        'neutral-mighty-inverse-color-pressed': { value: '{color.grey.100.value}', attributes: { category: 'color' } },

        // Selected
        'selected-color': { value: '{color.violet.100.value}', attributes: { category: 'color' } },
        'selected-color-hover': { value: '{color.violet.90.value}', attributes: { category: 'color' } },
        'selected-color-pressed': { value: '{color.violet.80.value}', attributes: { category: 'color' } },
        'selected-inverse-color': { value: '{color.violet.20.value}', attributes: { category: 'color' } },
        'selected-inverse-color-hover': { value: '{color.violet.10.value}', attributes: { category: 'color' } },
        'selected-inverse-color-pressed': { value: '{color.grey.0.value}', attributes: { category: 'color' } },

        // "selected-strong-color"                 : { value: "{color.violet.60.value}", attributes: { category: "color" } },
        // "selected-strong-color-hover"           : { value: "{color.violet.70.value}", attributes: { category: "color" } },
        // "selected-strong-color-pressed"         : { value: "{color.violet.80.value}", attributes: { category: "color" } },
        // "selected-strong-inverse-color"         : { value: "{color.grey.0.value}", attributes: { category: "color" } },
        // "selected-strong-inverse-color-hover"   : { value: "{color.violet.10.value}", attributes: { category: "color" } },
        // "selected-strong-inverse-color-pressed" : { value: "{color.violet.20.value}", attributes: { category: "color" } },

        // Disabled
        'disabled-color': { value: '{color.grey.100.value}', attributes: { category: 'color' } },
        'disabled-color-inverse': { value: '{text.color-disabled.value}', attributes: { category: 'color' } },

        'disabled-strong-color': { value: '{color.grey.70.value}', attributes: { category: 'color' } },
        'disabled-strong-color-inverse': { value: '{color.grey.100.value}', attributes: { category: 'color' } },

        // Positive
        'positive-color': { value: '{color.green.100.value}', attributes: { category: 'color' } },
        'positive-color-hover': { value: '{color.green.90.value}', attributes: { category: 'color' } },
        'positive-color-pressed': { value: '{color.green.80.value}', attributes: { category: 'color' } },
        'positive-inverse-color': { value: '{color.green.20.value}', attributes: { category: 'color' } },
        'positive-inverse-color-hover': { value: '{color.green.10.value}', attributes: { category: 'color' } },
        'positive-inverse-color-pressed': { value: '{color.grey.0.value}', attributes: { category: 'color' } },

        // "positive-strong-color"                 : { value: "{color.green.60.value}", attributes: { category: "color" } },
        // "positive-strong-color-hover"           : { value: "{color.green.70.value}", attributes: { category: "color" } },
        // "positive-strong-color-pressed"         : { value: "{color.green.80.value}", attributes: { category: "color" } },
        // "positive-strong-inverse-color"         : { value: "{color.grey.0.value}", attributes: { category: "color" } },
        // "positive-strong-inverse-color-hover"   : { value: "{color.green.10.value}", attributes: { category: "color" } },
        // "positive-strong-inverse-color-pressed" : { value: "{color.green.20.value}", attributes: { category: "color" } },

        // Negative
        'negative-color': { value: '{color.red.100.value}', attributes: { category: 'color' } },
        'negative-color-hover': { value: '{color.red.90.value}', attributes: { category: 'color' } },
        'negative-color-pressed': { value: '{color.red.80.value}', attributes: { category: 'color' } },
        'negative-inverse-color': { value: '{color.red.20.value}', attributes: { category: 'color' } },
        'negative-inverse-color-hover': { value: '{color.red.10.value}', attributes: { category: 'color' } },
        'negative-inverse-color-pressed': { value: '{color.grey.0.value}', attributes: { category: 'color' } },

        // "negative-strong-color"                 : { value: "{color.red.60.value}", attributes: { category: "color" } },
        // "negative-strong-color-hover"           : { value: "{color.red.70.value}", attributes: { category: "color" } },
        // "negative-strong-color-pressed"         : { value: "{color.red.80.value}", attributes: { category: "color" } },
        // "negative-strong-inverse-color"         : { value: "{color.grey.0.value}", attributes: { category: "color" } },
        // "negative-strong-inverse-color-hover"   : { value: "{color.red.10.value}", attributes: { category: "color" } },
        // "negative-strong-inverse-color-pressed" : { value: "{color.red.20.value}", attributes: { category: "color" } },

        // Warning
        'warning-color': { value: '{color.yellow.100.value}', attributes: { category: 'color' } },
        'warning-color-hover': { value: '{color.yellow.90.value}', attributes: { category: 'color' } },
        'warning-color-pressed': { value: '{color.yellow.80.value}', attributes: { category: 'color' } },
        'warning-inverse-color': { value: '{color.yellow.10.value}', attributes: { category: 'color' } },
        'warning-inverse-color-hover': { value: '{color.yellow.20.value}', attributes: { category: 'color' } },
        'warning-inverse-color-pressed': { value: '{color.yellow.30.value}', attributes: { category: 'color' } },

        // "warning-strong-color"                  : { value: "{color.yellow.60.value}", attributes: { category: "color" } },
        // "warning-strong-color-hover"            : { value: "{color.yellow.70.value}", attributes: { category: "color" } },
        // "warning-strong-color-pressed"          : { value: "{color.yellow.80.value}", attributes: { category: "color" } },
        // "warning-strong-inverse-color"          : { value: "{color.grey.90.value}", attributes: { category: "color" } },
        // "warning-strong-inverse-color-hover"    : { value: "{color.yellow.90.value}", attributes: { category: "color" } },
        // "warning-strong-inverse-color-pressed"  : { value: "{color.yellow.100.value}", attributes: { category: "color" } },
    },
};
