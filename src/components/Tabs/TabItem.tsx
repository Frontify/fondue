/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { BadgeProps } from '@components/Badge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { checkIfContainInteractiveElements } from '@utilities/elements';

export type TabItemProps = {
    id: string;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    decorator?: ReactElement;
    badge?: BadgeProps;
    children: ReactNode;
    active?: boolean;
};

export const TabItem = ({ active, disabled, children, id }: TabItemProps): Nullable<ReactElement> => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [hasInteractiveElements, setHasInteractiveElements] = useState(false);

    useEffect(() => {
        setHasInteractiveElements(checkIfContainInteractiveElements(ref.current));
    }, [children]);

    return active ? (
        <div
            role="tabpanel"
            ref={ref}
            id={`${id}-content`}
            aria-labelledby={id}
            className={merge([!active || disabled ? 'tw-hidden' : '', !hasInteractiveElements && FOCUS_VISIBLE_STYLE])}
            tabIndex={hasInteractiveElements ? -1 : 0}
        >
            {children}
        </div>
    ) : null;
};
TabItem.displayName = 'FondueTabItem';
