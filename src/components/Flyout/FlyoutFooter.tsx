import React, { FC, PropsWithChildren } from "react";
import { Button, ButtonProps, ButtonSize, ButtonStyle } from "@components/Button/Button";
import { merge } from "@utilities/merge";
import { IconCheck } from "@foundation/Icon";

export type FlyoutFooterProps = PropsWithChildren<{
    buttons: [ButtonProps, ButtonProps] | [ButtonProps];
    border?: boolean;
}>;

export const FlyoutFooter: FC<FlyoutFooterProps> = ({ buttons, border = true }) => {
    return (
        <div
            className={merge([
                "tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-bg-white dark:tw-bg-black-95",
                border && "tw-border-t tw-border-t-black-10",
            ])}
        >
            {buttons.map((button, index) => (
                <Button key={`flyout-footer-button-${index}`} {...button} size={ButtonSize.Medium} />
            ))}
        </div>
    );
};

export const LegacyFlyoutFooter = ({ onClick, onClose }: { onClick?: () => void; onClose?: () => void }) => (
    <FlyoutFooter
        buttons={
            onClick
                ? [
                      { children: "Cancel", onClick: onClose, style: ButtonStyle.Secondary },
                      { children: "Confirm", onClick: onClick, style: ButtonStyle.Primary, icon: <IconCheck /> },
                  ]
                : [{ children: "Close", onClick: onClose, style: ButtonStyle.Secondary }]
        }
    />
);
