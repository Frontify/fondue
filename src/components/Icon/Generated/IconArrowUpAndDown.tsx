import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconArrowUpAndDown(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconArrowUpAndDown"
            {...props}
        >
            <path d="M10.975 6.002 7.525 9.45A1.026 1.026 0 0 1 6.076 8l5.2-5.2c.4-.4 1.05-.4 1.45 0l5.2 5.2a1.026 1.026 0 0 1-1.45 1.45l-3.449-3.448v12.496L16.523 15a1.026 1.026 0 0 1 1.45 1.45l-5.249 5.25c-.4.4-1.05.4-1.45 0l-5.25-5.25A1.026 1.026 0 0 1 7.477 15l3.498 3.498V6.002Z" />
        </svg>
    );
}

const Memo = memo(IconArrowUpAndDown);
export default Memo;
