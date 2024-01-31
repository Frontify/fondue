/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { PopperDimension, PopperProps, PrepareElementStyleProps } from '@components/Popper/types';
import { EnablePortalWrapper } from '@utilities/dialogs/EnablePortalWrapper';
import { merge } from '@utilities/merge';

const DEFAULT_POPPER_WIDTH = 200;
const DEFAULT_POPPER_HEIGHT = 400;
const DEFAULT_DIALOG_TOP_POSITION = '100px';
const ARROW_DISTANCE_FROM_CORNER_VALUE = 12;
const CONTAINER_EXTRA_OFFSET_VALUE = 7;

const prepareElementStyle = ({ dimension, isVerticalAlignedToTop }: PrepareElementStyleProps) => ({
    left: `${(window.innerWidth - dimension.width) / 2}px`,
    top: isVerticalAlignedToTop ? DEFAULT_DIALOG_TOP_POSITION : `${(window.innerHeight - dimension.height) / 2}px`,
    transform: 'none',
});

const getArrowClasses = (currentPlacement: string) => {
    switch (true) {
        case currentPlacement.includes('top'):
            return 'before:tw-border-t-0 before:tw-border-l-0 tw-bottom-[-6px]';
        case currentPlacement.includes('right'):
            return 'before:tw-border-t-0 before:tw-border-r-0 tw-left-[-6px]';
        case currentPlacement.includes('bottom'):
            return 'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]';
        case currentPlacement.includes('left'):
            return 'before:tw-border-b-0 before:tw-border-l-0 tw-right-[-6px]';
        default:
            return 'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]';
    }
};

const getNewOffsetBasedOnArrowPosition = (currentPlacement: string, offset: [number, number]): [number, number] => {
    switch (true) {
        case currentPlacement.includes('end'):
            return [offset[0] + CONTAINER_EXTRA_OFFSET_VALUE, offset[1]];
        case currentPlacement.includes('start'):
            return [offset[0] - CONTAINER_EXTRA_OFFSET_VALUE, offset[1]];
        default:
            return offset;
    }
};

export const Popper = ({
    children,
    open,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = true,
    enablePortal = true,
    zIndex = 'auto',
    isDetached = false,
    verticalAlignment,
    strategy = 'absolute',
    anchor,
    withArrow = false,
    arrowCustomColors,
}: PopperProps) => {
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const [popperOffset, setPopperOffset] = useState<[number, number]>(offset);
    const [popperDimensions, setPopperDimensions] = useState<PopperDimension>({
        width: DEFAULT_POPPER_WIDTH,
        height: DEFAULT_POPPER_HEIGHT,
    });

    useEffect(() => {
        const trigger = anchor?.current;

        setReferenceElement(trigger as HTMLElement);
    }, [anchor]);

    const popperReferenceElement = isDetached ? document.body : referenceElement;

    const popperInstance = usePopper(popperReferenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset: popperOffset } },
            {
                name: 'flip',
                enabled: flip,
            },
            { name: 'arrow', options: { element: arrowElement, padding: ARROW_DISTANCE_FROM_CORNER_VALUE } },
        ],
        strategy,
    });

    const currentPlacement = popperInstance.state ? popperInstance.state.placement : placement;
    const arrowStyling = useMemo(() => getArrowClasses(currentPlacement), [currentPlacement]);

    useEffect(() => {
        const newOffset = withArrow ? getNewOffsetBasedOnArrowPosition(currentPlacement, offset) : offset;

        setPopperOffset((prevOffset) => {
            if (newOffset[0] !== prevOffset[0] || newOffset[1] !== prevOffset[1]) {
                return newOffset;
            }
            return prevOffset;
        });
    }, [currentPlacement, offset, withArrow]);

    useLayoutEffect(() => {
        const adjustPopperDimensions = () => {
            if (isDetached && popperInstance.state && open) {
                setPopperDimensions({
                    width: popperInstance.state.rects?.popper?.width,
                    height: popperInstance.state.rects?.popper?.height,
                });
            }
        };

        adjustPopperDimensions();
        window.addEventListener('resize', adjustPopperDimensions);

        return () => {
            window.removeEventListener('resize', adjustPopperDimensions);
        };
    }, [isDetached, open, popperInstance.state]);

    const detachedElementStyles = isDetached
        ? prepareElementStyle({ dimension: popperDimensions, isVerticalAlignedToTop: verticalAlignment === 'top' })
        : {};

    return (
        open && (
            <EnablePortalWrapper enablePortal={enablePortal}>
                <div
                    ref={setPopperElement}
                    style={{
                        zIndex,
                        ...popperInstance.styles.popper,
                        ...detachedElementStyles,
                    }}
                    {...popperInstance.attributes.popper}
                >
                    {children}
                    {withArrow && (
                        <div
                            data-test-id="popper-arrow"
                            data-popper-arrow={withArrow}
                            aria-hidden="true"
                            ref={setArrowElement}
                            style={popperInstance.styles.arrow}
                            className={merge([
                                'tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45',
                                arrowCustomColors,
                                arrowStyling,
                            ])}
                        />
                    )}
                </div>
            </EnablePortalWrapper>
        )
    );
};
Popper.displayName = 'FonduePopper';
