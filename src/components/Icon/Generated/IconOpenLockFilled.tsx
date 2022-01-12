import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconOpenLockFilled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconOpenLockFilled"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.367 8.667v-2.5a2.5 2.5 0 0 0-2.5-2.5H11.2a2.5 2.5 0 0 0-2.5 2.5.833.833 0 0 1-1.667 0A4.167 4.167 0 0 1 11.2 2h1.667a4.167 4.167 0 0 1 4.166 4.167v2.5h.834a2.5 2.5 0 0 1 2.5 2.5V19.5a2.5 2.5 0 0 1-2.5 2.5H6.2a2.5 2.5 0 0 1-2.5-2.5v-8.333a2.5 2.5 0 0 1 2.5-2.5h9.167ZM11.2 15.944a1.666 1.666 0 1 1 1.667 0V17a.833.833 0 0 1-1.667 0v-1.056Z"
            />
        </svg>
    );
}

const Memo = memo(IconOpenLockFilled);
export default Memo;
