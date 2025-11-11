/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateElement, type PlateElementProps } from '@udecode/plate-utils';
import { getHandler } from '@udecode/utils';
import { type ForwardedRef, forwardRef } from 'react';

import { merge } from '@utilities/merge';

export const MentionInputElement = forwardRef(
    (
        { className, onClick, ...props }: PlateElementProps & { onClick?: (mentionNode: unknown) => void },
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        const { children, element } = props;

        return (
            <PlateElement
                ref={ref}
                asChild
                data-slate-value={element.value}
                className={merge([
                    'tw-inline-block tw-rounded-sm tw-shadow-none tw-font-bold tw-leading-[10px] tw-m-0 tw-py-0.5 tw-px-1.5 tw-text-[rgb(130,95,255)] tw-bg-[rgb(227,232,246)]',
                    className,
                ])}
                onClick={getHandler(onClick, element)}
                {...props}
            >
                <span>{children}</span>
            </PlateElement>
        );
    },
);

MentionInputElement.displayName = 'MentionInputElement';
