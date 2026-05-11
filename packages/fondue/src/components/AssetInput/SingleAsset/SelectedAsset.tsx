/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-components/styles';

import { Dropdown } from '@frontify/fondue-components';
import { IconCaretDown } from '@frontify/fondue-icons';
import { useFocusRing } from '@react-aria/focus';
import { Fragment, type ReactElement, useState } from 'react';

import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type AssetInputProps, AssetInputSize, type AssetType } from '../AssetInput';
import { AssetThumbnail } from '../AssetThumbnail';
import {
    type AssetInputMenuBlock,
    type AssetInputMenuDefaultItemType,
    AssetInputMenuItemStyle,
    type AssetInputMenuSwitchItemType,
} from '../types';

import { AssetSubline } from './AssetSubline';
import { SpinningCircle } from './SpinningCircle';

export type SelectedAssetProps = Pick<
    AssetInputProps,
    'actions' | 'isLoading' | 'size' | 'hideSize' | 'hideExtension'
> & {
    asset: AssetType;
};

const matchTriggerWidth = (element: HTMLDivElement | null) => {
    if (!element) {
        return;
    }
    const TRIGGER_WIDTH = 'var(--radix-dropdown-menu-trigger-width)';

    element.style.width = TRIGGER_WIDTH;
    element.style.minWidth = TRIGGER_WIDTH;
    element.style.maxWidth = TRIGGER_WIDTH;
};

export const SelectedAsset = ({
    asset,
    size,
    actions,
    isLoading,
    hideSize = false,
    hideExtension = false,
}: Required<Omit<SelectedAssetProps, 'hideSize' | 'hideExtension'>> &
    Pick<SelectedAssetProps, 'hideSize' | 'hideExtension'>): ReactElement => {
    const labelId = useMemoizedId();
    const [isOpen, setIsOpen] = useState(false);
    const { isFocusVisible, focusProps } = useFocusRing();
    const title = asset?.name || 'Your Asset';

    const blocks = (actions ?? []) as AssetInputMenuBlock[];

    return (
        <div
            className="tw-font-sans tw-w-full tw-text-s tw-bg-transparent tw-font-normal tw-min-w-0"
            title={title}
            data-test-id="asset-single-input"
        >
            <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dropdown.Trigger>
                    <button
                        type="button"
                        {...focusProps}
                        aria-labelledby={labelId}
                        className={merge([
                            'tw-w-full tw-flex tw-border tw-rounded tw-overflow-hidden hover:tw-border-black-90 dark:hover:tw-border-black-40 focus-visible:tw-outline-none',
                            isFocusVisible && FOCUS_STYLE,
                            size === AssetInputSize.Large ? 'tw-h-[11.5rem] tw-flex-col' : 'tw-h-14',
                            isOpen || isFocusVisible
                                ? 'tw-border-black-90 dark:tw-border-black-10'
                                : 'tw-border-black-20 dark:tw-border-black-80',
                        ])}
                    >
                        {isLoading && !asset && (
                            <div
                                className={merge([
                                    'tw-flex tw-justify-center tw-items-center',
                                    size === AssetInputSize.Large ? 'tw-w-full tw-h-32' : 'tw-w-14 tw-h-full',
                                ])}
                            >
                                <SpinningCircle size={size} />
                            </div>
                        )}
                        {asset && <AssetThumbnail asset={asset} size={size} isActive={isOpen || isFocusVisible} />}
                        <div
                            className={merge([
                                'tw-min-w-0 tw-max-w-full tw-flex tw-flex-auto tw-self-stretch tw-border-black-100 tw-border-opacity-25',
                                size === AssetInputSize.Large ? 'tw-h-14 tw-border-t' : 'tw-h-full tw-border-l',
                            ])}
                        >
                            <div className="tw-min-w-0 tw-pr-3 tw-pl-4 tw-flex tw-flex-auto tw-flex-col tw-items-start tw-justify-center tw-h-full">
                                <span
                                    id={labelId}
                                    className={merge([
                                        'tw-max-w-full tw-text-black-100 tw-text-s tw-truncate dark:tw-text-white',
                                        (isOpen || isFocusVisible) && 'tw-font-medium',
                                    ])}
                                >
                                    {title}
                                </span>
                                <AssetSubline
                                    asset={asset}
                                    isLoading={isLoading}
                                    hideSize={hideSize}
                                    hideExtension={hideExtension}
                                />
                            </div>
                            <div className="tw-p-4 tw-flex tw-flex-none tw-items-center tw-justify-center">
                                <span
                                    className={merge([
                                        'tw-transition-transform',
                                        isOpen ? 'tw-rotate-180 tw-text-black-90' : 'tw-text-black-60',
                                    ])}
                                >
                                    <IconCaretDown size={16} />
                                </span>
                            </div>
                        </div>
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content ref={matchTriggerWidth} data-test-id="asset-single-input-flyout">
                    {blocks.map((block) => (
                        <Dropdown.Group key={block.id}>
                            {block.menuItems.map((item) => {
                                const isSwitch =
                                    'type' in item && (item as AssetInputMenuSwitchItemType).type === 'switch';
                                const emphasis = item.style === AssetInputMenuItemStyle.Danger ? 'danger' : 'default';
                                const itemContent = (
                                    <Fragment>
                                        {item.decorator && <Dropdown.Slot name="left">{item.decorator}</Dropdown.Slot>}
                                        <span>{item.title ?? item.children}</span>
                                    </Fragment>
                                );

                                return (
                                    <Dropdown.Item
                                        key={item.id}
                                        disabled={item.disabled}
                                        emphasis={emphasis}
                                        asChild={!!item.link}
                                        onSelect={(event) => {
                                            if (isSwitch) {
                                                event.preventDefault();
                                                const switchItem = item as AssetInputMenuSwitchItemType;
                                                const itemElement = event.currentTarget as HTMLElement | null;
                                                switchItem.onClick(!switchItem.initialValue);
                                                queueMicrotask(() => {
                                                    if (itemElement) {
                                                        itemElement.dataset.showFocusRing = 'false';
                                                    }
                                                });
                                                return;
                                            }
                                            (item as AssetInputMenuDefaultItemType).onClick?.();
                                        }}
                                    >
                                        {item.link ? <a href={item.link}>{itemContent}</a> : itemContent}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Group>
                    ))}
                </Dropdown.Content>
            </Dropdown.Root>
        </div>
    );
};
SelectedAsset.displayName = 'FondueSelectedAsset';
