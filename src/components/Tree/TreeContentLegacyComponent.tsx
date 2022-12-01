/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';

import { BadgeProps } from '@components/Badge';
import { EditableText } from '@components/EditableText';
import { Tooltip, TooltipPosition } from '@components/Tooltip';
import { IconProps } from '@foundation/Icon';
import { merge } from '@utilities/merge';

export interface TreeContentLegacyComponentProps {
    title: string;
    icon: ReactElement<IconProps>;
    onEditableSave?: (value: string) => void;
    badge?: ReactElement<IconProps> | ReactElement<BadgeProps>;
    tooltipContent?: ReactNode;
    label?: string;
    actions?: React.ReactNode[];
    selected: boolean;
    hovered: boolean;
}

export const TreeContentLegacyComponent = ({
    title,
    icon,
    onEditableSave,
    badge,
    tooltipContent,
    label,
    actions,
    selected,
    hovered,
}: TreeContentLegacyComponentProps) => {
    const badgeComponent = badge ? (
        <span>
            <Tooltip
                disabled={!tooltipContent}
                content={tooltipContent}
                position={TooltipPosition.Right}
                withArrow
                triggerElement={
                    <div
                        data-test-id="tree-content-legacy-component-badge"
                        className={merge([
                            'tw-flex tw-justify-center tw-items-center tw-ml-2 tw-text-text-weak',
                            badge?.props.size && 'tw-w-8 tw-h-5 tw-bg-box-neutral tw-rounded-full',
                        ])}
                    >
                        {badge}
                    </div>
                }
            />
        </span>
    ) : (
        <></>
    );

    return (
        <div
            data-test-id="tree-content-legacy-component"
            className="tw-relative tw-flex tw-justify-between tw-items-center tw-space-x-1 tw-w-full"
        >
            <div className="tw-flex tw-space-x-1.5 tw-w-full">
                <span
                    data-test-id="tree-content-legacy-component-icon"
                    className="tw-flex tw-justify-center tw-items-center tw-w-5"
                >
                    {icon}
                </span>

                <div
                    data-test-id="tree-content-legacy-component-editable-title"
                    className="tw-relative tw-flex tw-flex-1 tw-w-full tw-h-6"
                >
                    <div className="tw-relative tw-top-[0.2rem] tw-w-full tw-flex-1 tw-h-full">
                        <EditableText
                            options={{
                                enableDoubleClick: true,
                                isSlimInputField: true,
                                removeBoxPadding: true,
                            }}
                            onAdditionalValueSave={onEditableSave}
                            isOverflowing
                        >
                            <span className="tw-max-w-full tw-absolute tw-top-[-0.08rem] tw-truncate">{title}</span>
                        </EditableText>
                    </div>

                    {badgeComponent}
                </div>
            </div>

            {label && (
                <div data-test-id="tree-content-legacy-component-label" className="tw-flex-[0_0_auto]">
                    <span
                        data-test-id="node-label"
                        className={merge([
                            'tw-text-black-100 tw-text-opacity-40 tw-text-xs tw-font-normal',
                            selected && 'tw-text-box-selected-strong-inverse',
                        ])}
                    >
                        {label}
                    </span>
                </div>
            )}

            {actions && (
                <div
                    data-test-id="tree-content-legacy-component-actions"
                    className={merge([
                        'tw-flex tw-items-center',
                        hovered || selected ? 'tw-visible tw-space-x-1.5' : 'tw-invisible tw-w-0',
                    ])}
                >
                    {actions.map((action) => action)}
                </div>
            )}
        </div>
    );
};
