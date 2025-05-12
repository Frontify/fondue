/* (c) Copyright Frontify Ltd., all rights reserved. */

// TEMPORARY: This is a temporary mapping to ensure that the old tokens are still working during the transition to the new tokens.
// It will be removed after the transition is complete.
export default {
    theme: {
        extend: {
            colors: {
                base: {
                    DEFAULT: '/** @deprecated updated token instead **/ var(--color-surface-default)',
                    alt: '/** @deprecated Use updated token instead **/ var(--color-surface-dim)',
                },
                box: {
                    neutral: '/** @deprecated use updated token instead **/ var(--color-container-secondary-default)',
                    'neutral-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-hover)',
                    'neutral-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-active)',
                    'neutral-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-on-secondary-container)',
                    'neutral-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-on-secondary-container)',
                    'neutral-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-on-secondary-container)',
                    'neutral-strong':
                        '/** @deprecated use updated token instead **/ /** @deprecated use updated token instead **/ var(--color-primary-default)',
                    'neutral-strong-hover': '/** @deprecated use updated token instead **/ var(--color-primary-hover)',
                    'neutral-strong-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-primary-active)',
                    'neutral-strong-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'neutral-strong-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'neutral-strong-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'neutral-mighty': '/** @deprecated use updated token instead **/ var(--color-primary-default)',
                    'neutral-mighty-hover': '/** @deprecated use updated token instead **/ var(--color-primary-hover)',
                    'neutral-mighty-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-primary-active)',
                    'neutral-mighty-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'neutral-mighty-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'neutral-mighty-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    selected: '/** @deprecated use updated token instead **/ var(--color-container-highlight-default)',
                    'selected-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-highlight-hover)',
                    'selected-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-highlight-active)',
                    'selected-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-container-highlight-on-highlight-container)',
                    'selected-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-highlight-on-highlight-container)',
                    'selected-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-highlight-on-highlight-container)',
                    'selected-strong': '/** @deprecated use updated token instead **/ var(--color-highlight-default)',
                    'selected-strong-hover':
                        '/** @deprecated use updated token instead **/ var(--color-highlight-hover)',
                    'selected-strong-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-highlight-active)',
                    'selected-strong-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-highlight-on-highlight)',
                    'selected-strong-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-highlight-on-highlight)',
                    'selected-strong-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-highlight-on-highlight)',
                    disabled: '/** @deprecated use updated token instead **/ var(--color-container-disabled-default)',
                    'disabled-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-container-disabled-on-disabled-container)',
                    'disabled-strong': '/** @deprecated use updated token instead **/ var(--color-disabled-default)',
                    'disabled-strong-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-disabled-on-disabled)',
                    positive: '/** @deprecated use updated token instead **/ var(--color-container-success-default)',
                    'positive-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-hover)',
                    'positive-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-active)',
                    'positive-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-on-success-container)',
                    'positive-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-on-success-container)',
                    'positive-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-on-success-container)',
                    'positive-strong': '/** @deprecated use updated token instead **/ var(--color-success-default)',
                    'positive-strong-hover': '/** @deprecated use updated token instead **/ var(--color-success-hover)',
                    'positive-strong-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-success-active)',
                    'positive-strong-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success)',
                    'positive-strong-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success)',
                    'positive-strong-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success)',
                    negative: '/** @deprecated use updated token instead **/ var(--color-container-error-default)',
                    'negative-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-hover)',
                    'negative-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-active)',
                    'negative-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-on-error-container)',
                    'negative-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-on-error-container)',
                    'negative-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-on-error-container)',
                    'negative-strong': '/** @deprecated use updated token instead **/ var(--color-error-default)',
                    'negative-strong-hover': '/** @deprecated use updated token instead **/ var(--color-error-hover)',
                    'negative-strong-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-error-active)',
                    'negative-strong-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    'negative-strong-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    'negative-strong-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    warning: '/** @deprecated use updated token instead **/ var(--color-container-warning-default)',
                    'warning-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-warning-hover)',
                    'warning-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-warning-active)',
                    'warning-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-container-warning-on-warning-container)',
                    'warning-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-warning-on-warning-container)',
                    'warning-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-warning-on-warning-container)',
                    'warning-strong': '/** @deprecated use updated token instead **/ var(--color-warning-default)',
                    'warning-strong-hover': '/** @deprecated use updated token instead **/ var(--color-warning-hover)',
                    'warning-strong-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-warning-active)',
                    'warning-strong-inverse':
                        '/** @deprecated use updated token instead **/ var(--color-warning-on-warning)',
                    'warning-strong-inverse-hover':
                        '/** @deprecated use updated token instead **/ var(--color-warning-on-warning)',
                    'warning-strong-inverse-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-warning-on-warning)',
                },
                focus: { shadow: '/** @deprecated use updated token instead **/ var(--color-focus)' },
                line: {
                    DEFAULT: '/** @deprecated use updated token instead **/ var(--color-line-mid)',
                    weak: '/** @deprecated use updated token instead **/ var(--color-line-subtle)',
                    strong: '/** @deprecated use updated token instead **/ var(--color-line-strong)',
                    'x-strong': '/** @deprecated use updated token instead **/ var(--color-line-strong)',
                    'xx-strong': '/** @deprecated use updated token instead **/ var(--color-line-strong)',
                    mighty: '/** @deprecated use updated token instead **/ var(--color-line-mid)',
                },
                overlay: { shadow: '/** @deprecated use updated token instead **/ var(--color-overlay)' },
                shadow: { shadow: '/** @deprecated use updated token instead **/ var(--color-shadow)' },
                text: {
                    DEFAULT: '/** @deprecated use updated token instead **/ var(--color-primary-default)',
                    hover: '/** @deprecated use updated token instead **/ var(--color-primary-hover)',
                    pressed: '/** @deprecated use updated token instead **/ var(--color-primary-active)',
                    weak: '/** @deprecated use updated token instead **/ var(--color-secondary-default)',
                    'weak-hover': '/** @deprecated use updated token instead **/ var(--color-secondary-hover)',
                    'weak-pressed': '/** @deprecated use updated token instead **/ var(--color-secondary-active)',
                    'x-weak': '/** @deprecated use updated token instead **/ var(--color-secondary-default)',
                    disabled: '/** @deprecated use updated token instead **/ var(--color-disabled-default)',
                    negative: '/** @deprecated use updated token instead **/ var(--color-error-default)',
                    'negative-hover': '/** @deprecated use updated token instead **/ var(--color-error-hover)',
                    'negative-pressed': '/** @deprecated use updated token instead **/ var(--color-error-active)',
                    positive: '/** @deprecated use updated token instead **/ var(--color-success-default)',
                    'positive-hover': '/** @deprecated use updated token instead **/ var(--color-success-hover)',
                    'positive-pressed': '/** @deprecated use updated token instead **/ var(--color-success-active)',
                    warning: '/** @deprecated use updated token instead **/ var(--color-warning-default)',
                    'warning-hover': '/** @deprecated use updated token instead **/ var(--color-warning-hover)',
                    'warning-pressed': '/** @deprecated use updated token instead **/ var(--color-warning-active)',
                    interactive: '/** @deprecated use updated token instead **/ var(--color-interactive-default)',
                    'interactive-hover': '/** @deprecated use updated token instead **/ var(--color-interactive-hover)',
                    'interactive-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-interactive-active)',
                },
                button: {
                    background:
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-default)',
                    'background-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-hover)',
                    'background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-secondary-active)',
                    text: '/** @deprecated use updated token instead **/ var(--color-primary-default)',
                    icon: '/** @deprecated use updated token instead **/ var(--color-primary-default)',
                    border: '/** @deprecated use updated token instead **/ var(--color-primary-default)',
                    'negative-background':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-default)',
                    'negative-background-hover':
                        '/** @deprecated use updated token instead **/ var(--button-negative-background-color-hover)',
                    'negative-background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-active)',
                    'negative-text':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-on-error-container)',
                    'negative-icon':
                        '/** @deprecated use updated token instead **/ var(--color-container-error-on-error-container)',
                    'negative-border': '/** @deprecated use updated token instead **/ ',
                    'positive-background':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-default)',
                    'positive-background-hover':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-hover)',
                    'positive-background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-container-success-active)',
                    'positive-text':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success-container)',
                    'positive-icon':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success-container)',
                    'positive-border': '/** @deprecated use updated token instead **/ ',
                    'strong-background': '/** @deprecated use updated token instead **/ var(--color-primary-default)',
                    'strong-background-hover':
                        '/** @deprecated use updated token instead **/ var(--color-primary-hover)',
                    'strong-background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-primary-active)',
                    'strong-text': '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'strong-icon': '/** @deprecated use updated token instead **/ var(--color-primary-on-primary)',
                    'strong-border': '/** @deprecated use updated token instead **/ ',
                    'strong-negative-background':
                        '/** @deprecated use updated token instead **/ var(--color-error-default)',
                    'strong-negative-background-hover':
                        '/** @deprecated use updated token instead **/ var(--color-error-hover)',
                    'strong-negative-background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-error-active)',
                    'strong-negative-text': '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    'strong-negative-icon': '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    'strong-negative-border': '/** @deprecated use updated token instead **/ ',
                    'strong-positive-background':
                        '/** @deprecated use updated token instead **/ var(--color-success-default)',
                    'strong-positive-background-hover':
                        '/** @deprecated use updated token instead **/ var(--color-success-hover)',
                    'strong-positive-background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-success-active)',
                    'strong-positive-text':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success)',
                    'strong-positive-icon':
                        '/** @deprecated use updated token instead **/ var(--color-success-on-success)',
                    'strong-positive-border': '/** @deprecated use updated token instead **/ ',
                    'danger-background': '/** @deprecated use updated token instead **/ var(--color-error-default)',
                    'danger-background-hover': '/** @deprecated use updated token instead **/ var(--color-error-hover)',
                    'danger-background-pressed':
                        '/** @deprecated use updated token instead **/ var(--color-error-active)',
                    'danger-text': '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    'danger-icon': '/** @deprecated use updated token instead **/ var(--color-error-on-error)',
                    'danger-border': '/** @deprecated use updated token instead **/ ',
                },
            },
            extend: {
                fontSize: {
                    'body-x-small': ['var(--body-size-x-small)', 'var(--body-size-x-small-line-height)'],
                    'body-small': ['var(--body-size-small)', 'var(--body-size-small-line-height)'],
                    'body-medium': ['var(--body-size-medium)', 'var(--body-size-medium-line-height)'],
                    'body-large': ['var(--body-size-large)', 'var(--body-size-large-line-height)'],
                    'code-small': ['var(--code-size-small)', 'var(--code-size-small-line-height)'],
                    'code-medium': ['var(--code-size-medium)', 'var(--code-size-medium-line-height)'],
                    'code-large': ['var(--code-size-large)', 'var(--code-size-large-line-height)'],
                    'heading-medium': ['var(--heading-size-medium)', 'var(--heading-size-medium-line-height)'],
                    'heading-large': ['var(--heading-size-large)', 'var(--heading-size-large-line-height)'],
                    'heading-x-large': ['var(--heading-size-x-large)', 'var(--heading-size-x-large-line-height)'],
                    'heading-xx-large': ['var(--heading-size-xx-large)', 'var(--heading-size-xx-large-line-height)'],
                },
                fontFamily: {
                    body: 'var(--body-family)',
                    'body--stack': 'var(--body-family-stack)',
                    code: 'var(--code-family)',
                    'code--stack': 'var(--code-family-stack)',
                    heading: 'var(--heading-family)',
                    'heading--stack': 'var(--heading-family-stack)',
                },
                boxShadow: {
                    matrix: 'var(--shadow-matrix)',
                    'top-matrix': 'var(--shadow-top-matrix)',
                    'bottom-matrix': 'var(--shadow-bottom-matrix)',
                    'large-matrix': 'var(--shadow-large-matrix)',
                    'inner-line': 'inset 0 0 0 var(--line-width) var(--line-color)',
                    'inner-line-strong': 'inset 0 0 0 var(--line-width) var(--line-color-strong)',
                    'inner-line-x-strong': 'inset 0 0 0 var(--line-width) var(--line-color-x-strong)',
                    'inner-line-xx-strong': 'inset 0 0 0 var(--line-width) var(--line-color-xx-strong)',
                },
                borderWidth: { DEFAULT: 'var(--line-width)', large: 'var(--line-width-large)' },
                borderRadius: {
                    DEFAULT: 'var(--radius)',
                    small: 'var(--radius-small)',
                    large: 'var(--radius-large)',
                    'x-large': 'var(--radius-x-large)',
                },
                ringColor: { DEFAULT: 'var(--focus-ring-color)' },
                outline: { violet: '1px solid var(--focus-ring-color)' },
                spacing: {
                    xxs: 'var(--space-xxs)',
                    xs: 'var(--space-xs)',
                    s: 'var(--space-s)',
                    m: 'var(--space-m)',
                    l: 'var(--space-l)',
                    xl: 'var(--space-xl)',
                    xxl: 'var(--space-xxl)',
                },
            },
        },
    },
};
