import React, { FC, PropsWithChildren } from "react";
import { Button, ButtonProps, ButtonSize } from "@components/Button/Button";
import { ButtonGroup } from "@components/ButtonGroup";

export type FlyoutFooterProps = PropsWithChildren<{
    buttons: [ButtonProps, ButtonProps] | [ButtonProps];
}>;

export const FlyoutFooter: FC<FlyoutFooterProps> = ({ buttons }) => {
    return (
        <div className="tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-sticky tw-bottom-0 tw-bg-white dark:tw-bg-black-95">
            <ButtonGroup size={ButtonSize.Medium}>
                {buttons.map((button, index) => (
                    <Button key={`flyout-footer-button-${index}`} {...button} />
                ))}
            </ButtonGroup>
        </div>
    );
};
