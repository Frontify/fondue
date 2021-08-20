/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeader } from "@compositions/FieldsetHeader/FieldsetHeader";
import { Badge, BadgeProps } from "@elements/Badge/Badge";
import { Button, ButtonStyle } from "@elements/Button/Button";
import { Divider, DividerHeight } from "@elements/Divider/Divider";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import React, { Children, FC, ReactNode } from "react";

export const FLYOUT_DIVIDER_COLOR = "#eaebeb";

export type FlyoutProps = {
    onClose: () => void;
    onClick?: () => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
};

export const Flyout: FC<FlyoutProps> = ({ title, decorator, badges, onClick, onClose, children }) => (
    <div className="tw-flex tw-flex-col tw-rounded tw-bg-white tw-shadow-mid">
        {title && (
            <>
                <div className="tw-flex tw-justify-between tw-flex-wrap tw-gap-3 tw-p-8">
                    <div className="tw-inline-flex">
                        <FieldsetHeader decorator={decorator}>{title}</FieldsetHeader>
                    </div>
                    <div className="tw-inline-flex tw-gap-2 tw-flex-wrap">
                        {badges && badges.map((badge, index) => <Badge key={`flyout-badge-${index}`} {...badge} />)}
                    </div>
                </div>
                <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />
            </>
        )}
        {Children.map(children, (child, index) => (
            <>
                {index !== 0 && <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />}

                <div key={index} className="tw-p-8">
                    {child}
                </div>

                {index === Children.count(children) - 1 && (
                    <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />
                )}
            </>
        ))}
        <div className="tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8">
            {onClick ? (
                <>
                    <Button onClick={onClose} style={ButtonStyle.Secondary}>
                        Cancel
                    </Button>
                    <Button onClick={onClick} icon={<IconCheck />}>
                        Confirm
                    </Button>
                </>
            ) : (
                <Button onClick={onClose} style={ButtonStyle.Secondary}>
                    Close
                </Button>
            )}
        </div>
    </div>
);
