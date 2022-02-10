import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEraser16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconEraser16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M2.471 9.011c-.52.52-.52 1.365 0 1.886l2.676 2.676c.52.52 1.365.52 1.886 0l6.93-6.93L9.402 2.08l-6.93 6.93Zm1.892-.477L7.51 11.68l-1.184 1.185a.333.333 0 0 1-.472 0L3.178 10.19a.333.333 0 0 1 0-.472l1.185-1.184Zm.707-.707 1.22 1.22 4.332-4.332-1.22-1.22L5.07 7.827Zm1.927 1.927 1.22 1.22 4.332-4.332-1.22-1.22-4.332 4.332Z"
                    clipRule="evenodd"
                />
                <path d="M9.046 12.966a.5.5 0 0 0 0 1h3.398a.5.5 0 1 0 0-1H9.046Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEraser16);
export default Memo;
