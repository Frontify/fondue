import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLightning16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.528 6.704c-.16-.398-.456-.597-.888-.597H9.994l1.323-3.463c.181-.476.06-.852-.364-1.129-.423-.276-.817-.237-1.18.117l-6.81 6.641c-.302.294-.373.638-.214 1.031.16.394.452.59.876.59h2.4l-1.401 3.438c-.182.475-.065.856.35 1.141.415.286.808.255 1.18-.09l7.134-6.642c.32-.294.4-.64.24-1.037ZM7.425 8.948h-3.8l6.81-6.641-1.83 4.747h4.035l-7.134 6.641 1.92-4.747Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLightning16);
export default Memo;
