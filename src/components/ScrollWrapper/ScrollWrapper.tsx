/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import React, { ReactElement, useRef } from 'react';
import { FOCUS_STYLE, merge } from '../..';
import { useScrollWrapper } from './hooks/useScrollWrapper';
import { ScrollWrapperDirection, ScrollWrapperProps, scrollWrapperDirections } from './types';

const GRADIENTS = {
    bottom: 'linear-gradient(180deg, rgba(232, 233, 233, 0) 0%, #E8E9E9 100%)',
    top: 'linear-gradient(0deg, rgba(232, 233, 233, 0) 0%, #E8E9E9 100%)',
};

export const ScrollWrapper = ({
    tabindex: tabIndex = 0,
    direction = ScrollWrapperDirection.Vertical,
    children,
    scrollShadows = true,
    'data-test-id': dataTestId = 'scroll-wrapper',
}: ScrollWrapperProps): ReactElement => {
    const scrollingContainer = useRef<HTMLDivElement>(null);

    const [{ showTopShadow, showBottomShadow }, scrollDivProps] = useScrollWrapper(scrollingContainer);

    const { isFocusVisible, focusProps } = useFocusRing();

    const directionVertical =
        direction === ScrollWrapperDirection.Vertical || direction === ScrollWrapperDirection.Both;

    const gradientWidth = scrollingContainer.current ? scrollingContainer.current.clientWidth + 8 : '100%';

    return (
        <div data-test-id={dataTestId} className="tw-h-full tw-relative tw-flex-auto tw-flex tw-flex-col tw-min-h-0">
            {directionVertical && showTopShadow && scrollShadows && (
                <div
                    data-test-id="fondue-scrollwrapper-top-shadow"
                    className="tw-h-3 tw-w-full tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-mix-blend-darken tw-border-t tw-border-line"
                    style={{
                        background: GRADIENTS.top,
                        width: gradientWidth,
                    }}
                />
            )}
            <div
                data-test-id="fondue-scrollwrapper-content"
                ref={scrollingContainer}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={tabIndex}
                role="region"
                aria-label="Scrollable dialogue content"
                className={merge([
                    scrollWrapperDirections[direction],
                    'tw-flex-auto tw-min-h-0 tw-outline-none tw-pt-px tw-pb-2 tw-px-2 tw--mx-2',
                    isFocusVisible && FOCUS_STYLE,
                ])}
                {...scrollDivProps}
                {...focusProps}
            >
                {children}
            </div>
            {directionVertical && showBottomShadow && scrollShadows && (
                <div
                    data-test-id="fondue-scrollwrapper-bottom-shadow"
                    className="tw-h-3 tw-absolute tw-z-10 tw-bottom-0 tw-left-0 tw-mix-blend-darken tw-border-b tw-border-line"
                    style={{
                        background: GRADIENTS.bottom,
                        width: gradientWidth,
                    }}
                />
            )}
        </div>
    );
};
ScrollWrapper.displayName = 'FondueScrollWrapper';
