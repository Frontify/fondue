import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlusFrame24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlusFrame24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.91 16.436a.91.91 0 1 1-1.82 0v-1.818H9.274a.91.91 0 1 1 0-1.818h1.818v-1.818a.91.91 0 0 1 1.818 0V12.8h1.818a.91.91 0 0 1 0 1.818H12.91v1.818Z" />
                <path
                    fillRule="evenodd"
                    d="M4.308 2.8h15.384A2.308 2.308 0 0 1 22 5.108v13.846a2.308 2.308 0 0 1-2.308 2.308H4.308A2.308 2.308 0 0 1 2 18.954V5.108A2.308 2.308 0 0 1 4.308 2.8Zm-.77 5.385v10.769c0 .425.345.77.77.77h15.384a.77.77 0 0 0 .77-.77V8.184H3.538Zm16.924-1.539H3.538V5.108a.77.77 0 0 1 .77-.77h15.384a.77.77 0 0 1 .77.77v1.538Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusFrame24);
export default Memo;
