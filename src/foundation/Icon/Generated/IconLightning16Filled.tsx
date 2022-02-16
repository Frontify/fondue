import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLightning16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3.055 9.272h4.236l-1.966 4.86a.389.389 0 0 0 .626.43l7.738-7.203a.389.389 0 0 0-.265-.674H8.903l1.858-4.823a.389.389 0 0 0-.634-.418l-7.343 7.16a.389.389 0 0 0 .271.668Z"
            />
        </svg>
    );
}

const Memo = memo(IconLightning16Filled);
export default Memo;
