/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TinyColor } from '@ctrl/tinycolor';
import { useFocusRing } from '@react-aria/focus';
import { type ReactElement } from 'react';

import { MenuItemContent } from '@components/MenuItem/MenuItemContent';
import { Trigger } from '@components/Trigger/Trigger';
import IconDroplet from '@foundation/Icon/Generated/IconDroplet';
import { IconSize } from '@foundation/Icon/IconSize';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { toShortRgb } from '@utilities/colors';
import { merge } from '@utilities/merge';

import { type ColorFormat } from '../../types/colors';

import { ColorInputTitle } from './ColorInputTitle';
import { type ColorPickerFlyoutProps } from './ColorPickerFlyout';

type ColorInputTriggerProps = Pick<ColorPickerFlyoutProps, 'id' | 'currentColor' | 'disabled'> & {
    isOpen?: boolean;
    format: ColorFormat;
    clearable?: boolean;
    onClear?: () => void;
    onDelete?: () => void;
};

export const ColorInputTrigger = ({
    id,
    currentColor,
    format,
    isOpen = false,
    disabled = false,
    clearable = false,
    onClear,
    onDelete,
}: ColorInputTriggerProps): ReactElement => {
    const { isFocusVisible, focusProps } = useFocusRing();
    const backgroundColor = currentColor ? new TinyColor(toShortRgb(currentColor)).toRgbString() : '';

    return (
        <Trigger
            isOpen={isOpen}
            disabled={disabled}
            isFocusVisible={isFocusVisible}
            showClear={!!currentColor && clearable}
            onClear={onClear}
            onDelete={onDelete}
        >
            <button
                {...focusProps}
                type="button"
                id={useMemoizedId(id)}
                disabled={disabled}
                className={merge([
                    'tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none tw-py-2 tw-pl-3 tw-min-h-[34px] tw-pr-8',
                    !currentColor && 'tw-text-black-60',
                    disabled && 'tw-text-black-40',
                ])}
            >
                <MenuItemContent
                    title={
                        currentColor ? <ColorInputTitle format={format} currentColor={currentColor} /> : 'Select color'
                    }
                    decorator={
                        currentColor ? (
                            <span
                                className={merge([
                                    'tw-h-4 tw-w-4 tw-rounded tw-flex tw-items-center tw-justify-center tw-ring-1 tw-ring-black-10 tw-ring-offset-1',
                                    disabled && 'tw-opacity-50',
                                ])}
                                style={{ backgroundColor }}
                            />
                        ) : (
                            <span className="tw-text-black-70">
                                <IconDroplet size={IconSize.Size12} />
                            </span>
                        )
                    }
                />
            </button>
        </Trigger>
    );
};
ColorInputTrigger.displayName = 'FondueColorInputTrigger';
