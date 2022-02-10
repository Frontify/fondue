import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEye24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconEye24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M16 12a4 4 0 1 1-7.839-1.129c.122-.413.607-.551.98-.336.347.2.465.637.396 1.031a2.5 2.5 0 1 0 1.732-1.958c-.276.085-.58.089-.83-.056-.505-.29-.56-.994-.025-1.225A4 4 0 0 1 16 12Z" />
                <path
                    fillRule="evenodd"
                    d="M22.726 11.273c.22.46.22.994 0 1.454A11.876 11.876 0 0 1 12 19.5a11.876 11.876 0 0 1-10.726-6.773 1.69 1.69 0 0 1 0-1.454A11.876 11.876 0 0 1 12 4.5c4.732 0 8.818 2.768 10.726 6.773ZM3.02 12.826a1.644 1.644 0 0 1 0-1.652A10.371 10.371 0 0 1 12 6c3.833 0 7.183 2.079 8.98 5.174.296.511.296 1.14 0 1.652A10.371 10.371 0 0 1 12 18a10.371 10.371 0 0 1-8.98-5.174Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconEye24);
export default Memo;
