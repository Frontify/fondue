/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export const Heading2 = (props: HeadingProps) => {
    if (!props.children) {
        throw new Error('Invalid Code Content');
    }
    return <h2 className="tw-text-lg tw-font-semibold tw-mb-2">{props.children}</h2>;
};

export const Heading3 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
    if (!props.children) {
        throw new Error('Invalid Code Content');
    }
    return <h3 className="tw-text-lg tw-font-normal tw-mb-2 tw-italic">{props.children}</h3>;
};
