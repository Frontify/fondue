/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkIfContainInteractiveElements } from '@utilities/elements';
import { merge } from '@utilities/merge';
import { type ReactElement, type ReactNode, useEffect, useState } from 'react';

export type TabItemProps = {
    id: string;
    disabled?: boolean;
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
