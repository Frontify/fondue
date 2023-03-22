/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Switch, SwitchMode, SwitchSize } from '@components/Switch/Switch';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { merge } from '@utilities/merge';
import React, { FC, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { IconCaretDown, IconMinus, IconPlus } from '@foundation/Icon/Generated';
import { IconSize } from '@foundation/Icon/IconSize';
import { IconProps } from '@foundation/Icon';

export const ACCORDION_ICON_CONTAINER_ID = 'accordion-icon-container';

export const ADDREMOVE_ICON_CONTAINER_ID = 'addremove-icon-container';

export enum FieldsetHeaderSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

const sizeMap: Record<FieldsetHeaderSize, { icon: IconSize; text: string; switch: SwitchSize }> = {
    [FieldsetHeaderSize.Small]: {
        icon: IconSize.Size12,
        text: 'tw-text-s',
        switch: SwitchSize.Small,
    },
    [FieldsetHeaderSize.Medium]: {
        icon: IconSize.Size16,
        text: 'tw-text-m',
        switch: SwitchSize.Medium,
    },
    [FieldsetHeaderSize.Large]: {
        icon: IconSize.Size20,
        text: 'tw-text-l',
        switch: SwitchSize.Medium,
    },
};

export enum FieldsetHeaderType {
    Default = 'Default',
    Switch = 'Switch',
    Accordion = 'Accordion',
    AddRemove = 'AddRemove',
}

export type FieldsetHeaderProps = {
    size?: FieldsetHeaderSize;
    active?: boolean;
    decorator?: ReactNode;
    type?: FieldsetHeaderType;
    disabled?: boolean;
    bold?: boolean;
    children: string;
    onClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
    tabIndex?: number;
};

export const renderFieldsetHeaderIconType = (
    type: FieldsetHeaderType,
    id: string,
    size: FieldsetHeaderSize,
    active: boolean,
    disabled: boolean,
) => {
    const props = {
        'aria-labelledby': id,
        size: sizeMap[size].icon,
    };

    switch (type) {
        case FieldsetHeaderType.Switch:
            return (
                <div data-test-id="fieldset-icon-wrapper">
                    <Switch
                        {...props}
                        size={sizeMap[size].switch}
                        mode={active ? SwitchMode.On : SwitchMode.Off}
                        disabled={disabled}
                    />
                </div>
            );
        case FieldsetHeaderType.Accordion:
            return (
                <div data-test-id="fieldset-icon-wrapper">
                    <div
                        data-test-id={ACCORDION_ICON_CONTAINER_ID}
                        className={merge([
                            'tw-transition-transform',
                            active && 'tw-rotate-180 tw-duration-300',
                            !disabled && active && 'tw-text-black',
                            !disabled && !active && 'tw-text-black-80',
                            disabled && 'tw-text-black-40',
                        ])}
                    >
                        <IconCaretDown {...props} />
                    </div>
                </div>
            );
        case FieldsetHeaderType.AddRemove:
            return (
                <div data-test-id="fieldset-icon-wrapper">
                    <div
                        data-test-id={ADDREMOVE_ICON_CONTAINER_ID}
                        className={merge([
                            active && !disabled && 'tw-text-black',
                            !active && !disabled && 'tw-text-black-80',
                            disabled && 'tw-text-black-40',
                        ])}
                    >
                        {active ? <IconMinus {...props} /> : <IconPlus {...props} />}
                    </div>
                </div>
            );
    }

    return null;
};

export const FieldsetHeader: FC<FieldsetHeaderProps> = ({
    size = FieldsetHeaderSize.Large,
    active = true,
    decorator,
    type = FieldsetHeaderType.Default,
    disabled = false,
    bold = true,
    children,
    onClick,
    as: Heading = 'label',
    tabIndex = -1,
}) => {
    const id = useMemoizedId();
    const clickOnNotDisabled = () => !disabled && onClick && onClick();

    let headingFontWeightClass = 'tw-font-normal';
    if (bold) {
        headingFontWeightClass = 'tw-font-bold';
    } else if (size === FieldsetHeaderSize.Medium) {
        headingFontWeightClass = 'tw-font-medium';
    }

    return (
        <header
            data-test-id="fieldset-header"
            role={onClick ? 'button' : undefined}
            onClick={clickOnNotDisabled}
            onKeyPress={clickOnNotDisabled}
            className={merge([
                'tw-flex tw-items-center tw-gap-x-1.5 tw-w-full tw-flex-row',
                disabled ? 'tw-text-black-40' : 'dark:tw-text-white',
                !disabled && active ? 'tw-text-black' : 'tw-text-black-80',
                !disabled && onClick ? 'hover:tw-cursor-pointer' : 'tw-pointer-events-none',
            ])}
            tabIndex={tabIndex}
        >
            {isValidElement(decorator) && (
                <span className="tw-shrink-0">
                    {cloneElement(decorator as ReactElement<IconProps>, {
                        size: sizeMap[size].icon,
                    })}
                </span>
            )}
            <Heading
                id={id}
                className={merge([
                    'tw-text-left',
                    sizeMap[size].text,
                    headingFontWeightClass,
                    onClick && 'hover:tw-cursor-pointer',
                ])}
            >
                {children}
            </Heading>
            {type !== FieldsetHeaderType.Default && (
                <span data-test-id="fieldset-icon-container" className="tw-ml-auto tw-shrink-0">
                    {renderFieldsetHeaderIconType(type, id, size, active, disabled)}
                </span>
            )}
        </header>
    );
};
FieldsetHeader.displayName = 'FondueFieldsetHeader';
