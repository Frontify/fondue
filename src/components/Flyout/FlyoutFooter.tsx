import React, { FC, PropsWithChildren, ReactElement } from "react";
import { ButtonProps, ButtonSize } from "@components/Button/Button";
import { ButtonGroup } from "@components/ButtonGroup";

export type FlyoutFooterProps = PropsWithChildren<{
    primaryButton: ReactElement<ButtonProps>;
    secondaryButton?: ReactElement<ButtonProps>;
}>;

export const FlyoutFooter: FC<FlyoutFooterProps> = ({ primaryButton, secondaryButton }) => {
    return (
        <div className="tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-sticky tw-bottom-0 tw-bg-white dark:tw-bg-black-95">
            <ButtonGroup size={ButtonSize.Medium}>
                {secondaryButton}
                {primaryButton}
            </ButtonGroup>
        </div>
    );
};
