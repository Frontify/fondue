/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionInputElement, MentionInputElementProps, Value } from '@udecode/plate';
import { MentionInputMarkupElementStyles } from './MentionInputMarkupElementStyles';

export const MentionInputMarkupElementNode = (props: MentionInputElementProps<Value>) => {
    return <MentionInputElement {...props} styles={MentionInputMarkupElementStyles} />;

    // const { attributes, children, nodeProps, element, onClick } = props;
    // const rootProps = getRootProps(props);

    // return (
    //     <span
    //         {...attributes}
    //         data-slate-value={element.value}
    //         onClick={getHandler(onClick, element)}
    //         onKeyDown={getHandler(onClick, element)}
    //         role="button"
    //         tabIndex={-1}
    //         {...rootProps}
    //         {...nodeProps}
    //     >
    //         {children}
    //     </span>
    // );
};
