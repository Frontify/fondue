import React, { FC, PropsWithChildren } from "react";
import { Button, ButtonProps, ButtonStyle } from "@components/Button/Button";
import { IconCheck } from "@foundation/Icon";
import { merge } from "@utilities/merge";

export type FlyoutFooterProps = PropsWithChildren<{
    buttons: [ButtonProps, ButtonProps] | [ButtonProps];
    border?: boolean;
}>;

export const FlyoutFooter: FC<FlyoutFooterProps> = ({ buttons, border = true }) => (
    <div
        className={merge([
            "tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-bg-white dark:tw-bg-black-95",
            border && "tw-border-t-black-10 tw-border-t",
        ])}
    >
        {buttons.map((button, index) => (
            <Button key={`flyout-footer-button-${index}`} {...button} />
        ))}
    </div>
);

export const FlyoutLegacyFooter = ({ onClick, onClose }: { onClick?: () => void; onClose?: () => void }) => (
    <FlyoutFooter
        buttons={
            onClick
                ? [
                      { onClick: onClose, style: ButtonStyle.Secondary, children: "Cancel" },
                      { onClick, style: ButtonStyle.Primary, children: "Confirm", icon: <IconCheck /> },
                  ]
                : [{ onClick: onClose, style: ButtonStyle.Secondary, children: "Close" }]
        }
    />
);
