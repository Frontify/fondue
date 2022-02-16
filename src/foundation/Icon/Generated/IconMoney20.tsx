import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMoney20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMoney20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M10.813 18.333v-1.92c2.005-.313 3.354-1.808 3.354-3.838 0-4.762-5.861-2.806-5.861-5.537 0-.978.622-1.495 1.642-1.495 1.055 0 1.781.609 1.954 1.513l2.075-.646c-.329-1.513-1.487-2.565-3.164-2.824v-1.92H8.997v1.957c-1.815.37-2.99 1.735-2.99 3.673 0 4.762 5.895 2.787 5.895 5.519 0 1.033-.674 1.66-1.78 1.66-1.16 0-2.145-.645-2.266-1.66l-2.022.553c.345 1.68 1.504 2.714 3.163 3.009v1.956h1.816Z"
            />
        </svg>
    );
}

const Memo = memo(IconMoney20);
export default Memo;
