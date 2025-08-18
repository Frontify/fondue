/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ReactElement, type ReactNode } from 'react';

export const EditableTextHelper = {
    /**
     * Recursively iterators through Children
     * returns all instances of string amended together
     *
     */
    getLabel: (children?: ReactNode | string) => {
        let label = '';
        const iteratorStep = (children?: ReactNode | string) => {
            Children.map(children, (child) => {
                if (typeof child === 'string') {
                    label += child;
                } else {
                    const element = child as ReactElement | undefined;
                    if (element?.props) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                        iteratorStep(element.props.children);
                    }
                }
            });
        };
        iteratorStep(children);

        return label;
    },

    /**
     * Accesses the window object and copies the computed style
     * of the element
     *
     */
    copyStyles: (current: Element) => {
        return {
            fontSize: window.getComputedStyle(current).getPropertyValue('font-size'),
            lineHeight: window.getComputedStyle(current).getPropertyValue('line-height'),
            letterSpacing: window.getComputedStyle(current).getPropertyValue('letter-spacing'),
            minWidth: window.getComputedStyle(current).getPropertyValue('width'),
            fontWeight: window.getComputedStyle(current).getPropertyValue('font-weight'),
        };
    },
};
