/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useLayoutEffect, useState } from 'react';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { usePopper } from 'react-popper';
import { Portal } from '@components/Portal';
import { PopperDimension, PopperProps, PrepareElementStyleProps } from '@components/Popper/types';

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
}: PopperProps) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [popperDimensions, setPopperDimensions] = useState<PopperDimension>({
        width: DEFAULT_POPPER_WIDTH,
        height: DEFAULT_POPPER_HEIGHT,
    });

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
        <>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore Property 'displayName' does not exist on type 'JSXElementConstructor<any>'.ts(2339)
                    const { displayName } = child.type;

                    if (displayName === Trigger.displayName) {
                        return <div ref={setReferenceElement}>{child}</div>;
                    }

                    if (displayName === Content.displayName && open) {
                        return enablePortal ? (
                            <Portal>
                                <div
                                    ref={setPopperElement}
                                    style={{
                                        zIndex,
                                        ...popperInstance.styles.popper,
                                        ...detachedElementStyles,
                                    }}
                                    {...popperInstance.attributes.popper}
                                >
                                    {child}
                                </div>
                            </Portal>
                        ) : (
                            <div
                                ref={setPopperElement}
                                style={{
                                    zIndex,
                                    ...popperInstance.styles.popper,
                                    ...detachedElementStyles,
                                }}
                                {...popperInstance.attributes.popper}
                            >
                                {child}
                            </div>
                        );
                    }
                }
            })}
        </>
    );
};
Popper.displayName = 'FonduePopper';
Popper.Trigger = Trigger;
Popper.Content = Content;
