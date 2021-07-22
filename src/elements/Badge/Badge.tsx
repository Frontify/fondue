/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Theme } from "@utilities/enum";
import { PropsWithChildren, ReactElement } from "react";
import css from "./Badge.module.css";

export enum BadgeStatus {
    Success = "Success",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
    Custom = "Custom",
}

export type BadgeProps = PropsWithChildren<{
    theme?: Theme;
    status?: BadgeStatus;
    customColor?: string;
}>;

export default function Badge({
    children,
    theme = Theme.Light,
    status,
    customColor,
}: BadgeProps): ReactElement<BadgeProps> {
    const badgeClasses = [css.badge, css[`theme${theme}`]].join(" ");
    return (
        <div className={badgeClasses} data-test-id="badge">
            {(() => {
                switch (status) {
                    case undefined:
                        return;
                    case BadgeStatus.Custom:
                        if (customColor) {
                            return <i className={css.bubble} style={{ backgroundColor: customColor }}></i>;
                        }
                        return;
                    default:
                        return <i className={[css.bubble, css[`status${status}`]].join(" ")}></i>;
                }
            })()}
            {children}
        </div>
    );
}
