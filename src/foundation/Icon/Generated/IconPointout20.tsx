import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPointout20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPointout20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M12.083 11.667a2.917 2.917 0 1 1 0-5.834 2.917 2.917 0 0 1 0 5.834Zm0-1.667a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
                <path d="M15.833 2.5H4.167a2.5 2.5 0 0 0-2.5 2.5v10a2.5 2.5 0 0 0 2.5 2.5h11.666a2.5 2.5 0 0 0 2.5-2.5V5a2.5 2.5 0 0 0-2.5-2.5ZM3.333 5c0-.46.373-.833.833-.833h11.667c.46 0 .833.373.833.833v10c0 .46-.373.833-.833.833H4.167A.833.833 0 0 1 3.333 15V5Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPointout20);
export default Memo;
