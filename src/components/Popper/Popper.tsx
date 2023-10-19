/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useLayoutEffect, useRef, useState } from 'react';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { usePopper } from 'react-popper';
import { Portal } from '@components/Portal';
import { PopperProps } from '@components/Popper/types';

const DEFAULT_POPPER_WIDTH = 200;
const DEFAULT_POPPER_HEIGHT = 400;
const DEFAULT_DIALOG_TOP_POSITION = '100px';

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
    const referenceElementRef = useRef(null);
    const popperElementRef = useRef(null);
    const [popperDimensions, setPopperDimensions] = useState({
        width: DEFAULT_POPPER_WIDTH,
        height: DEFAULT_POPPER_HEIGHT,
    });

    const popperInstance = usePopper(
        isDetached ? document.body : referenceElementRef.current,
        popperElementRef.current,
        {
            placement,
            modifiers: [
                { name: 'offset', options: { offset } },
                {
                    name: 'flip',
                    enabled: flip,
                },
            ],
            strategy,
        },
    );

    useLayoutEffect(() => {
        if (popperInstance.state && open) {
            setPopperDimensions({
                width: popperInstance.state.rects.popper.width,
                height: popperInstance.state.rects.popper.height,
            });
        }
    }, [open, popperInstance.state]);

    const detachedElementStyles = isDetached
        ? {
              left: `${(window.innerWidth - popperDimensions.width) / 2}px`,
              top:
                  verticalAlignment === 'top'
                      ? DEFAULT_DIALOG_TOP_POSITION
                      : `${(window.innerHeight - popperDimensions.height) / 2}px`,
              transform: 'none',
          }
        : {};

    return (
        <>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore Property 'displayName' does not exist on type 'JSXElementConstructor<any>'.ts(2339)
                    const { displayName } = child.type;

                    if (displayName === Trigger.displayName) {
                        return <div ref={referenceElementRef}>{child}</div>;
                    }

                    if (displayName === Content.displayName && open) {
                        return enablePortal ? (
                            <Portal>
                                <div
                                    ref={popperElementRef}
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
                                ref={popperElementRef}
                                style={{ zIndex, ...popperInstance.styles.popper, ...detachedElementStyles }}
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
