import React, { ReactElement, ReactNode } from 'react';

export const EditableInputHelper = {
    /**
     * Recursively iterators through Children
     * returns all instances of string amended together
     *
     * @param children
     */
    getLabel: (children?: ReactNode | string) => {
        let label = '';
        const iteratorStep = (children?: ReactNode | string) => {
            React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                    label += child;
                } else {
                    !!(child as ReactElement)?.props && iteratorStep((child as ReactElement)?.props.children);
                }
            });
        };
        iteratorStep(children);

        return label;
    },
};
