/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode, useEffect, useState } from 'react';
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
    active?: boolean;
};

export const TabItem = ({ active, disabled, children, id }: TabItemProps): Nullable<ReactElement> => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const [hasInteractiveElements, setHasInteractiveElements] = useState(false);

    useEffect(() => {
        setHasInteractiveElements(checkIfContainInteractiveElements(ref));
    }, [ref]);

    return active ? (
        <div
            role="tabpanel"
            ref={setRef}
            id={`${id}-content`}
            aria-labelledby={id}
            className={merge([!active || disabled ? 'tw-hidden' : '', 'focus:tw-ring-4 focus:tw-ring-blue'])}
            tabIndex={hasInteractiveElements ? -1 : 0}
        >
            {children}
        </div>
    ) : null;
};
TabItem.displayName = 'FondueTabItem';
