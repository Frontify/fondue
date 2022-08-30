/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionElementProps } from '@udecode/plate';
import { useFocused, useSelected } from 'slate-react';

export const MentionElement = (props: MentionElementProps) => {
    const { attributes, children, element, nodeProps, prefix, renderLabel } = props;

    console.log('props', props);
    const selected = useSelected();
    const focused = useFocused();

    // const styles = getMentionElementStyles({ ...props, selected, focused });
    // console.log('styles', styles);

    console.log('element', element);
    // const { value, key, category } = element;

    const backgroundColor: Record<string, string> = {
        group: '#00FF00',
        user: '#ff0000',
        all: '#0000FF',
    };

    return (
        <span
            {...attributes}
            data-slate-value={element.value}
            data-slate-key={element.key}
            data-slate-category={element.category}
            contentEditable={false}
            data-cy={`mention-${element.value?.replaceAll(' ', '-')}`}
            // className={styles.root.className}
            // css={styles.root.css}
            style={{
                padding: '3px 3px 2px',
                margin: '0 1px',
                verticalAlign: 'baseline',
                display: 'inline-block',
                borderRadius: '4px',
                backgroundColor: backgroundColor[element.category],
                fontSize: '0.9em',
                boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
            }}
            {...nodeProps}
        >
            {prefix}
            {renderLabel ? renderLabel(element) : element.value}
            {children}
        </span>
    );
};
