import React, {ReactElement} from 'react';

export const EditableInputHelper = {
    /**
     * Recursively iterators through Children
     * returns all instances of string amended together
     *
     * @param children
     */
    getLabel: (children?: React.ReactElement) => {
        let label = '';
        const iteratorStep = (children?: ReactElement | string) => {
            React.Children.map(children, (child) => {
                if (typeof child === 'string') {
                    label += child;
                } else {
                    !!child && iteratorStep(child.props.children);
                }
            });
        };
        iteratorStep(children);

        return label;
    },
};
