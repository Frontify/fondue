/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PropsWithChildren, ReactElement } from "react";

export enum BadgeStatus {
    Success = "Success",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
    Custom = "Custom",
}

export type BadgeProps =
    | PropsWithChildren<{
          status?: BadgeStatus;
          customColor?: string;
      }>
    | PropsWithChildren<{
          status: BadgeStatus.Custom;
          customColor: string;
      }>
    | PropsWithChildren<{
          status: BadgeStatus.Success | BadgeStatus.Progress | BadgeStatus.Warning | BadgeStatus.Danger;
          customColor: undefined;
      }>;

export const statusClasses: Record<BadgeStatus, string> = {
    [BadgeStatus.Success]: "bg-green-60",
    [BadgeStatus.Progress]: "bg-violet-60",
    [BadgeStatus.Warning]: "bg-yellow-60",
    [BadgeStatus.Danger]: "bg-red-60",
    [BadgeStatus.Custom]: "",
};

export default function Badge({ children, status, customColor }: BadgeProps): ReactElement<BadgeProps> {
    return (
        <div
            className="bg-black-10 text-black-80 dark:bg-black-100 dark:text-white inline-flex flex-grow-0 flex-shrink-0 flex-auto items-center justify-center px-2 py-1 rounded-full font-sans text-xxs font-normal text-center"
            data-test-id="badge"
        >
            {status && (
                <i
                    data-test-id="badge-status"
                    className={`inline-block w-2 h-2 rounded-full mr-1 ${statusClasses[status]}`}
                    style={BadgeStatus.Custom ? { backgroundColor: customColor } : undefined}
                />
            )}
            {children}
        </div>
    );
}
