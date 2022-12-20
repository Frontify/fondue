/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, ReactNode, useRef } from 'react';
import { BadgeProps } from '@components/Badge';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

export type TabItemProps = {
    id: string;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    decorator?: ReactElement;
    badge?: BadgeProps;
    children: ReactNode;
};

export const TabItem: FC<TabItemProps & { active?: boolean }> = ({ active, disabled, children, id }) => {
    const { isFocusVisible, focusProps } = useFocusRing();
    const ref = useRef<HTMLDivElement | null>(null);
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableChildren = ref.current?.querySelectorAll(focusableElements) ?? [];
    const hasInteractiveElements = focusableChildren.length > 0;

    return (
        <div
            role="tabpanel"
            ref={ref}
            id={`${id}-content`}
            aria-labelledby={id}
            className={merge([!active || disabled ? 'tw-hidden' : '', isFocusVisible && FOCUS_STYLE])}
            tabIndex={hasInteractiveElements ? -1 : 0}
            {...focusProps}
        >
            {children}
        </div>
    );
};
