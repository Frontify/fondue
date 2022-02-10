import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFlag20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFlag20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.375 2.625a.625.625 0 1 1 1.25 0v.5H16.25c.52 0 .813.598.493 1.009L14.125 7.5l2.618 3.366a.625.625 0 0 1-.493 1.01H5.625v5.5a.625.625 0 0 1-1.25 0V2.624Zm1.25 8h9.347L12.84 7.884a.625.625 0 0 1 0-.768l2.132-2.74H5.625v6.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFlag20);
export default Memo;
