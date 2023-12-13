/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { BadgeProps } from '@components/Badge';
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
};

export const TabItem = ({ active, disabled, children, id }: TabItemProps & { active?: boolean }): ReactElement => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [hasInteractiveElements, setHasInteractiveElements] = useState(false);

    useEffect(() => {
        setHasInteractiveElements(checkIfContainInteractiveElements(ref.current));
    }, [children]);

    return (
        <div
            role="tabpanel"
            ref={ref}
            id={`${id}-content`}
            aria-labelledby={id}
            className={merge([!active || disabled ? 'tw-hidden' : '', 'focus:tw-ring-4 focus:tw-ring-blue'])}
            tabIndex={hasInteractiveElements ? -1 : 0}
        >
            {children}
        </div>
    );
};
TabItem.displayName = 'FondueTabItem';
