import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMagnifier16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMagnifier16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.42 13.641c-3.361 0-6.087-2.755-6.087-6.154 0-3.398 2.726-6.154 6.088-6.154s6.087 2.756 6.087 6.154a6.17 6.17 0 0 1-1.344 3.858c.04.024.079.053.114.087l2.174 2.051a.69.69 0 0 1 .033.967.671.671 0 0 1-.956.033l-2.174-2.052a.684.684 0 0 1-.119-.148 6.021 6.021 0 0 1-3.815 1.358Zm0-1.367c2.615 0 4.735-2.143 4.735-4.787 0-2.643-2.12-4.786-4.734-4.786-2.615 0-4.735 2.143-4.735 4.786 0 2.644 2.12 4.787 4.735 4.787Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMagnifier16);
export default Memo;
