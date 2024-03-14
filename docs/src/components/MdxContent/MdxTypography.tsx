/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export const Heading1 = (props: HeadingProps) => {
    if (!(typeof props.children === 'string')) {
        return null;
    }
    return (
        <h1 id={props.children.toLowerCase()} className="tw-text-2xl tw-font-bold tw-mb-2">
            {props.children}
        </h1>
    );
};

export const Heading2 = (props: HeadingProps) => {
    if (!(typeof props.children === 'string')) {
        return null;
    }
    return (
        <h2 id={props.children.toLowerCase()} className="tw-text-xl tw-font-semibold tw-mb-2">
            {props.children}
        </h2>
    );
};

export const Heading3 = (props: HeadingProps) => {
    if (!(typeof props.children === 'string')) {
        return null;
    }
    return (
        <h3 id={props.children.toLowerCase()} className="tw-text-lg tw-font-semibold tw-mb-2">
            {props.children}
        </h3>
    );
};

export const MdxTypography = { h1: Heading1, h2: Heading2, h3: Heading3 };
