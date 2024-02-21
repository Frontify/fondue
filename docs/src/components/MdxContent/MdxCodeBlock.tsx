/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { EditableComponent } from '../EditableComponent/EditableComponent';

export const MdxCodeBlock = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    if (props.children) {
        return <EditableComponent language={props.className?.split('language-')[1]} code={props.children as string} />;
    } else {
        throw new Error('Invalid Code Content');
    }
};
