import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPerson12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPerson12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.98 6.499a4.175 4.175 0 0 1 2.175 4.094h-8.31a4.175 4.175 0 0 1 2.203-4.11 2.922 2.922 0 0 1 1.975-5.076A2.922 2.922 0 0 1 7.98 6.499Zm-.845.534a2.909 2.909 0 0 1-2.246-.009 3.344 3.344 0 0 0-2.204 2.734h6.63a3.344 3.344 0 0 0-2.18-2.725ZM8.11 4.33a2.087 2.087 0 1 1-4.174.002A2.087 2.087 0 0 1 8.11 4.33Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPerson12);
export default Memo;
