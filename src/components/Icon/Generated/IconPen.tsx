import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconPen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconPen"
            {...props}
        >
            <path d="m6.95 19.875 8.425-8.431-2.825-2.819-8.425 8.431v1.283h1.539v1.536H6.95Zm5.793-13.5 4.882 4.882L7.882 21H3v-4.882l9.743-9.743Zm8.257.81c0 .402-.14.744-.42 1.025l-1.578 1.54-4.752-4.788 1.579-1.52A1.31 1.31 0 0 1 16.847 3c.413 0 .759.148 1.038.443l2.696 2.695c.28.295.419.644.419 1.046Z" />
        </svg>
    );
}

const Memo = memo(IconPen);
export default Memo;
