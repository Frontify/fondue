import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPills12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPills12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 5H1.5a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75H3a.75.75 0 0 0 .75-.75v-.75A.75.75 0 0 0 3 5ZM1.5 6.5v-.75H3v.75H1.5Zm3.75-.75v.75h1.5v-.75h-1.5ZM6.75 5h-1.5a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-.75A.75.75 0 0 0 6.75 5ZM9 5.75v.75h1.5v-.75H9ZM10.5 5H9a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-.75A.75.75 0 0 0 10.5 5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPills12);
export default Memo;
