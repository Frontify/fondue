import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPause32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPause32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.524 5.333c.63 0 1.143.53 1.143 1.186v18.963c0 .654-.512 1.185-1.143 1.185H7.809c-.63 0-1.143-.531-1.143-1.186V6.518c0-.654.512-1.185 1.143-1.185h5.715Zm-.458 1.66h-4.8v18.014h4.8V6.993Zm11.124-1.66c.631 0 1.143.53 1.143 1.186v18.963c0 .654-.511 1.185-1.143 1.185h-5.714c-.631 0-1.143-.531-1.143-1.186V6.518c0-.654.512-1.185 1.143-1.185h5.714Zm-.457 1.66h-4.8v18.014h4.8V6.993Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPause32);
export default Memo;
