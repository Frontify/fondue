/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ForwardRefRenderFunction, ReactElement, forwardRef } from 'react';
import { Tooltip, TooltipProps } from '@components/Tooltip';
import { merge } from '@utilities/merge';

export type InputExtraAction = {
    onClick: () => void;
    icon: ReactElement;
    title: string;
    tooltip?: Omit<TooltipProps, 'triggerElement'>;
    disabled?: boolean;
};

export type InputExtraActionsProps = {
    items: InputExtraAction[];
};

type ExtraActionButtonProps = {
    extraAction: InputExtraAction;
};

const ExtraActionButton: ForwardRefRenderFunction<HTMLButtonElement | null, ExtraActionButtonProps> = (
    { extraAction },
    ref,
): ReactElement | null => {
    if (!extraAction) {
        return null;
    }
    const isDisabled = extraAction.disabled;
    return (
        <button
            className={merge([
                'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-p-1',
                isDisabled
                    ? 'tw-cursor-default tw-text-text-disabled'
                    : 'tw-text-text-weak hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
            ])}
            onClick={extraAction.onClick}
            data-test-id="fondue-input-extra-action-button"
            aria-label={extraAction.title.toLowerCase()}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            type="button"
            ref={ref}
        >
            {extraAction.icon}
        </button>
    );
};

const ExtraActionButtonWithRef = forwardRef(ExtraActionButton);

export const InputExtraActions = ({ items = [] }: InputExtraActionsProps) => {
    return (
        <>
            {items.map((item: InputExtraAction, index: number) => {
                const key = `input-extra-action-${index}`;
                if (item.tooltip) {
                    return (
                        <Tooltip
                            key={key}
                            {...item.tooltip}
                            triggerElement={<ExtraActionButtonWithRef extraAction={item} />}
                        />
                    );
                }
                return <ExtraActionButtonWithRef key={key} extraAction={item} />;
            })}
        </>
    );
};
