import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLollipop32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLollipop32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.333 10.667V20a1 1 0 0 0 2 0v-9.333a1 1 0 1 0-2 0ZM17.666 20v-9.333a1 1 0 1 1 2 0V20a1 1 0 0 1-2 0Z" />
                <path
                    fillRule="evenodd"
                    d="M16 2.667A9.333 9.333 0 0 1 25.333 12v8.736a4 4 0 0 1-4 4h-2V26a3.333 3.333 0 0 1-6.666 0v-1.264h-2a4 4 0 0 1-4-4V12A9.333 9.333 0 0 1 16 2.667Zm-1.334 22.07V26a1.333 1.333 0 0 0 2.667 0v-1.264h-2.666ZM16 4.666A7.333 7.333 0 0 0 8.666 12v8.736a2 2 0 0 0 2 2h10.667a2 2 0 0 0 2-2V12A7.333 7.333 0 0 0 16 4.667Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLollipop32);
export default Memo;
