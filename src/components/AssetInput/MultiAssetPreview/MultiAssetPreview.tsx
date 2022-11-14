/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretRight, IconSize } from '@foundation/Icon';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { FC, useRef } from 'react';
import { AssetType } from '../AssetInput';
import { Assets } from './Assets';

export type MultiAssetPreviewProps = {
    numberOfLocations: number;
    assets: AssetType[];
    onClick: () => void;
};

// const FOCUS_STYLE = "tw-border-black-90 dark:tw-border-black-10";

export const MultiAssetPreview: FC<MultiAssetPreviewProps> = ({ numberOfLocations, assets, onClick }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { buttonProps } = useButton({ onPress: onClick }, buttonRef);
    const { isFocusVisible, focusProps } = useFocusRing();
    const assetsLength = assets.length;

    return (
        <div data-test-id="multi-asset-preview">
            <button
                title="multi-asset-preview"
                {...mergeProps(buttonProps, focusProps)}
                ref={buttonRef}
                className={merge([
                    'tw-flex tw-border tw-rounded hover:tw-border-black-90 dark:hover:tw-border-black-40 focus-visible:tw-outline-none dark:tw-text-white tw-mb-4 tw-w-full',
                    isFocusVisible
                        ? `${FOCUS_STYLE} tw-border-black-90 dark:tw-border-black-10`
                        : 'tw-border-black-20 dark:tw-border-black-80',
                ])}
            >
                <Assets assets={assets} />
                <div className="tw-py-6 tw-px-4 tw-flex">
                    <div className="tw-text-left">
                        <div className="tw-font-bold tw-text-m" data-test-id="assets-amount">
                            {assetsLength} {assetsLength === 1 ? 'Asset' : 'Assets'}
                        </div>
                        <div className="tw-text-black-60 tw-text-s tw-mt-1" data-test-id="number-of-locations">
                            {numberOfLocations} {numberOfLocations === 1 ? 'location' : 'locations'}
                        </div>
                    </div>
                    <div className="tw-flex tw-items-center tw-text-black-70 tw-pl-4">
                        <div className="tw-absolute tw-right-12">
                            <IconCaretRight size={IconSize.Size24} />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};
