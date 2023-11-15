/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { PopperDimension, PopperProps, PrepareElementStyleProps } from '@components/Popper/types';
import { EnablePortalWrapper } from '@utilities/dialogs/EnablePortalWrapper';

const DEFAULT_POPPER_WIDTH = 200;
const DEFAULT_POPPER_HEIGHT = 400;
const DEFAULT_DIALOG_TOP_POSITION = '100px';

const prepareElementStyle = ({ dimension, isVerticalAlignedToTop }: PrepareElementStyleProps) => ({
    left: `${(window.innerWidth - dimension.width) / 2}px`,
    top: isVerticalAlignedToTop ? DEFAULT_DIALOG_TOP_POSITION : `${(window.innerHeight - dimension.height) / 2}px`,
    transform: 'none',
});

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
}: PopperProps) => {
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [popperDimensions, setPopperDimensions] = useState<PopperDimension>({
        width: DEFAULT_POPPER_WIDTH,
        height: DEFAULT_POPPER_HEIGHT,
    });

    useEffect(() => {
        const trigger = anchor?.current;

        if (trigger) {
            setReferenceElement(trigger as HTMLElement);
        }
    }, [anchor]);

    const popperInstance = usePopper(isDetached ? document.body : referenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'offset', options: { offset } },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
        strategy,
    });

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
                </div>
            </EnablePortalWrapper>
        )
    );
};
Popper.displayName = 'FonduePopper';
