/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PointerEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import { PopperPlacement } from '@components/Popper';
import { merge } from '@utilities/merge';
import { Z_INDEX_TOOLTIP } from '@utilities/dialogs/constants';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { ARROW_DARK_THEME } from '@utilities/overlayStyle';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Modality } from '../../types';
import { checkIfContainInteractiveElements } from '@utilities/elements';
import { useClickOutside } from '@hooks/useClickOutside';

export type TooltipProps = {
    id?: string;
    children: ReactElement;
    openOnMount?: boolean;
    placement?: PopperPlacement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
    content: string;
    withArrow?: boolean;
    size?: 'spacious' | 'compact';
    maxWidth?: string | number;
    maxHeight?: string | number;
    enterDelay?: number;
    leaveDelay?: number;
    'data-test-id'?: string;
    zIndex?: number;
    disabled?: boolean;
};

const formatTooltipText = (text: string) => {
    const lineBreakRegex = /<br\s*\/?>/;
    return text.split(lineBreakRegex).join('\n');
};

let timeoutId: number | undefined;
const handleTimeout = (callback: () => void, delay: number) => {
    if (timeoutId) {
        window.clearTimeout(timeoutId);
    }

    if (delay) {
        timeoutId = window.setTimeout(callback, delay);
    } else {
        callback();
    }
};

const isPointerEventTypeMouse = (event: PointerEvent): boolean => event.pointerType === 'mouse';

export const Tooltip = ({
    id,
    children,
    offset = [0, 8],
    flip = true,
    content,
    placement = 'bottom',
    withArrow = true,
    size = 'spacious',
    openOnMount = false,
    maxWidth = 200,
    maxHeight = 'auto',
    enablePortal = true,
    enterDelay = 0,
    leaveDelay = 200,
    disabled = false,
    zIndex = Z_INDEX_TOOLTIP,
    'data-test-id': dataTestId = 'fondue-tooltip',
}: TooltipProps) => {
    const [open, setOpen] = useState(openOnMount);
    const [hasInteractiveElements, setHasInteractiveElements] = useState(false);

    const handleShowTooltip = () => {
        if (!disabled) {
            handleTimeout(() => setOpen(true), enterDelay);
        }
    };

    const handleHideTooltip = useCallback(() => {
        handleTimeout(() => {
            setOpen(false);
            clearTimeout(timeoutId);
        }, leaveDelay);
    }, [leaveDelay]);

    const { dismissibleElementRef } = useClickOutside<HTMLDivElement>(handleHideTooltip, []);

    const focusAndMouseAttributes = {
        onBlur: handleHideTooltip,
        onFocus: handleShowTooltip,
        onPointerEnter: (event: PointerEvent) => {
            if (isPointerEventTypeMouse(event)) {
                handleShowTooltip();
            }
        },
        onPointerLeave: (event: PointerEvent) => {
            if (isPointerEventTypeMouse(event)) {
                handleHideTooltip();
            }
        },
    };

    useEffect(() => {
        setHasInteractiveElements(checkIfContainInteractiveElements(dismissibleElementRef.current));
    }, [dismissibleElementRef]);

    return (
        <>
            <div
                ref={dismissibleElementRef}
                tabIndex={hasInteractiveElements || disabled ? undefined : 0}
                aria-describedby={id}
                aria-disabled={disabled}
                data-test-id={`${dataTestId}-button`}
                className={merge(['tw-inline-block tw-rounded tw-max-w-[100%] tw-outline-none', FOCUS_VISIBLE_STYLE])}
                {...focusAndMouseAttributes}
            >
                {children}
            </div>
            <Overlay
                id={id}
                aria-hidden={!open}
                open={open}
                theme="dark"
                withArrow={withArrow}
                arrowCustomColors={ARROW_DARK_THEME}
                anchor={dismissibleElementRef}
                placement={placement}
                offset={offset}
                flip={flip}
                enablePortal={enablePortal}
                role="tooltip"
                data-test-id={dataTestId}
                modality={Modality.NonModal}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                zIndex={zIndex}
                shadow="none"
                isDialog={false}
                darkUnderlay={false}
            >
                <p
                    className={merge([
                        size === 'spacious' ? 'tw-pt-2 tw-px-3 tw-pb-2.5' : 'tw-pt-1 tw-px-2 tw-pb-1.5',
                        'tw-text-heading-medium tw-whitespace-pre-line tw-break-words',
                    ])}
                >
                    {formatTooltipText(content)}
                </p>
            </Overlay>
        </>
    );
};
Tooltip.displayName = 'FondueTooltip';
