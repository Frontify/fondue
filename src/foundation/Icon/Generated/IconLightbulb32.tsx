import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightbulb32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLightbulb32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M7.533 11.333a8.467 8.467 0 1 1 13.6 6.734V20a3.8 3.8 0 0 1-3.8 3.8h-2.666a3.8 3.8 0 0 1-3.8-3.8v-1.933a8.455 8.455 0 0 1-3.334-6.734Zm5.6 8.667c0 .847.687 1.533 1.534 1.533h2.666c.847 0 1.534-.686 1.534-1.533v-3.133l.514-.336a6.2 6.2 0 1 0-6.762 0l.514.336V20Z"
                    clipRule="evenodd"
                />
                <path d="M19.8 26.667c0 .625-.508 1.133-1.134 1.133h-5.333a1.133 1.133 0 0 1 0-2.267h5.333c.627 0 1.134.508 1.134 1.134Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLightbulb32);
export default Memo;
