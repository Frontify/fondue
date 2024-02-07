/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn, withRef } from '@udecode/cn';
import { PlateElement, getHandler } from '@udecode/plate';
import { ComponentProps } from 'react';

export const MentionInputElement: React.FC<
    ComponentProps<typeof PlateElement> & { onClick?: (mentionNode: unknown) => void }
> = withRef<
    typeof PlateElement,
    {
        onClick?: (mentionNode: unknown) => void;
    }
>(({ className, onClick, ...props }, ref) => {
    const { children, element } = props;

    return (
        <PlateElement
            ref={ref}
            asChild
            data-slate-value={element.value}
            className={cn(
                'tw-inline-block tw-rounded-sm tw-shadow-none tw-font-bold tw-leading-[10px] tw-m-0 tw-py-0.5 tw-px-1.5 tw-text-[rgb(130,95,255)] tw-bg-[rgb(227,232,246)]',
                className,
            )}
            onClick={getHandler(onClick, element)}
            {...props}
        >
            <span>{children}</span>
        </PlateElement>
    );
});
