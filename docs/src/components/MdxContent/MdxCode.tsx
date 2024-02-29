/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DetailedHTMLProps, type HTMLAttributes, isValidElement } from 'react';

import { CodeSnippet } from '../EditableComponent/CodeSnippet';

type PreProps = {
    children?: React.ReactNode;
};

export const Pre = ({ children, ...props }: PreProps) => {
    if (isValidElement(children)) {
        return (
            <div {...props}>
                <MdxLiveCodeBlock live={true} {...children.props} />
            </div>
        );
    }
    return <Code {...props} />;
};

export const Code = (props: PreProps) => {
    return (
        <code className="tw-font-mono tw-text-sm tw-bg-box-neutral tw-w-fit tw-py-1 tw-px-2 tw-rounded" {...props}>
            {props.children}
        </code>
    );
};

export const MdxLiveCodeBlock = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    if (!props.children) {
        throw new Error('Invalid Code Content');
    }

    return <CodeSnippet language={props.className?.split('language-')[1]} code={props.children as string} />;
};
