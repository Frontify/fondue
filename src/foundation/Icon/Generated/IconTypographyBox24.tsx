import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyBox24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTypographyBox24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.23 9.788v5.485H9.894v1.539h4.214v-1.539H12.77V9.788h1.958v1.004h1.539V8.25H7.734v2.542h1.539V9.788h1.958Z" />
                <path
                    fillRule="evenodd"
                    d="M19.692 3.3H4.308A2.308 2.308 0 0 0 2 5.608v13.846a2.308 2.308 0 0 0 2.308 2.308h15.384A2.308 2.308 0 0 0 22 19.454V5.608A2.308 2.308 0 0 0 19.692 3.3ZM3.538 5.608a.77.77 0 0 1 .77-.77h15.384a.77.77 0 0 1 .77.77v13.846a.77.77 0 0 1-.77.77H4.308a.77.77 0 0 1-.77-.77V5.608Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyBox24);
export default Memo;
