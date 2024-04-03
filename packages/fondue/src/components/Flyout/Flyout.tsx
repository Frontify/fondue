/* (c) Copyright Frontify Ltd., all rights reserved. */

import { watchModals } from '@react-aria/aria-modal-polyfill';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { OverlayContainer, useOverlayTrigger } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { useOverlayTriggerState } from '@react-stately/overlays';
import {
    type HTMLAttributes,
    type MouseEvent,
    type MutableRefObject,
    type ReactElement,
    type ReactNode,
    useEffect,
    useRef,
} from 'react';

import { type BadgeProps } from '@components/Badge';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { LegacyFlyoutFooter } from './FlyoutFooter';
import { Overlay } from './Overlay';
import { useContainScroll } from './hooks/useContainScroll';
import { useOverlayPositionWithBottomMargin } from './hooks/useOverlayPositionWithBottomMargin';

export const FLYOUT_DIVIDER_COLOR = '#eaebeb';
export const FLYOUT_DIVIDER_HEIGHT = '10px';

export enum FlyoutPlacement {
    Top = 'top',
    Bottom = 'bottom',
    TopLeft = 'top left',
    BottomLeft = 'bottom left',
    TopRight = 'top right',
    BottomRight = 'bottom right',
    Right = 'right',
    Left = 'left',
}

export type FlyoutProps = {
    trigger:
        | ReactNode
        | ((
              triggerProps: HTMLAttributes<HTMLElement>,
              ref: MutableRefObject<HTMLElement | null>,
              triggerState: { isFocusVisible: boolean; isPressed: boolean },
          ) => JSX.Element);
    onCancel?: () => void;
    onConfirm?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
    hug?: boolean;
    fitContent?: boolean;
    isOpen?: boolean;
    onOpenChange: (isOpen: boolean) => void;
    fixedHeader?: ReactNode;
    fixedFooter?: ReactNode;
    contentMinHeight?: number;
    /**
     * The legacy footer buttons section inside of the flyout will be deleted in the future.
     * @deprecated Pass the FlyoutFooter component with buttons to the Flyout component.
     */
    legacyFooter?: boolean;
    placement?: FlyoutPlacement;
    offset?: number;
    updatePositionOnContentChange?: boolean;
    isTriggerDisabled?: boolean;
    children?: ReactNode;
};

export const Flyout = ({
    trigger,
    isTriggerDisabled = false,
    decorator,
    onConfirm,
    onCancel,
    children,
    onOpenChange,
    isOpen = false,
    title = '',
    badges = [],
    hug = true,
    fitContent = false,
    fixedHeader,
    fixedFooter,
    contentMinHeight,
    legacyFooter = true,
    placement = FlyoutPlacement.BottomLeft,
    offset,
    updatePositionOnContentChange = false,
}: FlyoutProps): ReactElement => {
    const state = useOverlayTriggerState({ isOpen, onOpenChange });
    const { toggle, close } = state;
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();

    const { triggerProps, overlayProps: overlayTriggerProps } = useOverlayTrigger(
        { type: 'dialog' },
        state,
        triggerRef,
    );

    const { positionProps } = useOverlayPositionWithBottomMargin({
        triggerRef,
        overlayRef,
        scrollRef,
        isOpen,
        placement,
        offset,
        updatePositionOnContentChange,
    });

    const { buttonProps, isPressed } = useButton(
        // @ts-expect-error preventFocusOnPress is an undocumented property in react-aria
        { onPress: () => toggle(), elementType: 'div', isDisabled: isTriggerDisabled, preventFocusOnPress: true },
        triggerRef,
    );

    useEffect(() => {
        const revert = watchModals();

        return () => revert();
    }, []);

    useContainScroll(overlayRef, { isDisabled: !isOpen });

    const combinedTriggerProps = mergeProps(buttonProps, triggerProps, focusProps, {
        'aria-label': 'Toggle Flyout Menu',
    });

    const triggerComponent =
        typeof trigger === 'function' ? (
            trigger(combinedTriggerProps, triggerRef, { isFocusVisible, isPressed })
        ) : (
            <div
                {...combinedTriggerProps}
                ref={triggerRef}
                className={merge([
                    'tw-outline-none tw-rounded',
                    hug ? 'tw-mx-3' : 'tw-w-full',
                    isFocusVisible && FOCUS_STYLE,
                ])}
                data-test-id="flyout-trigger"
            >
                {trigger}
            </div>
        );

    return (
        <>
            {triggerComponent}
            {isOpen && (
                <OverlayContainer>
                    <FocusScope restoreFocus contain>
                        <Overlay
                            title={title}
                            badges={badges}
                            decorator={decorator}
                            isOpen={isOpen}
                            onClose={close}
                            overlayTriggerProps={overlayTriggerProps}
                            positionProps={positionProps}
                            fixedHeader={fixedHeader}
                            fixedFooter={
                                legacyFooter ? (
                                    <LegacyFlyoutFooter onConfirm={onConfirm} onCancel={onCancel} />
                                ) : (
                                    fixedFooter
                                )
                            }
                            ref={overlayRef}
                            scrollRef={scrollRef}
                            fitContent={fitContent}
                            contentMinHeight={contentMinHeight}
                        >
                            {children}
                        </Overlay>
                    </FocusScope>
                </OverlayContainer>
            )}
        </>
    );
};
Flyout.displayName = 'FondueFlyout';
