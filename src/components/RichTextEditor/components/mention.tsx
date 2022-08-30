/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionElementProps, getMentionElementStyles } from '@udecode/plate';
import { useFocused, useSelected } from 'slate-react';

export const MentionElement = (props: MentionElementProps) => {
    const { attributes, children, element, nodeProps, prefix, renderLabel } = props;

    const selected = useSelected();
    const focused = useFocused();

    const styles = getMentionElementStyles({ ...props, selected, focused });
    console.log('styles', styles);

    return (
        <span
            {...attributes}
            data-slate-value={element.value}
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
                backgroundColor: '#ff0000',
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
