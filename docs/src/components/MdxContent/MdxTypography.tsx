/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export const Heading2 = (props: HeadingProps) => {
    return <h2 className="tw-text-lg tw-font-semibold tw-mb-2">{props.children}</h2>;
};

export const Heading3 = (props: HeadingProps) => {
    return <h3 className="tw-text-lg tw-font-normal tw-mb-2 tw-italic">{props.children}</h3>;
};
