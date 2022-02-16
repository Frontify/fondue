import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMagnifierPlus24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMagnifierPlus24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M13.836 10.23h-1.705V8.48a1 1 0 1 0-2 0v1.75H8.426a1 1 0 1 0 0 2h1.705v1.75a1 1 0 1 0 2 0v-1.75h1.705a1 1 0 0 0 0-2Z" />
                <path
                    fillRule="evenodd"
                    d="M2 11.23c0 5.099 4.088 9.232 9.13 9.232a9.032 9.032 0 0 0 5.724-2.038c.048.08.108.156.18.223l3.26 3.077c.409.387 1.05.364 1.433-.05a1.033 1.033 0 0 0-.05-1.45l-3.26-3.076a1.015 1.015 0 0 0-.171-.131 9.255 9.255 0 0 0 2.016-5.786C20.262 6.133 16.174 2 11.13 2S2 6.133 2 11.23Zm16.233 0c0 3.966-3.18 7.18-7.102 7.18s-7.102-3.214-7.102-7.18c0-3.964 3.18-7.179 7.102-7.179s7.102 3.215 7.102 7.18Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconMagnifierPlus24);
export default Memo;
