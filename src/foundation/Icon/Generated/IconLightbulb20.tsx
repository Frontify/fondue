import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightbulb20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLightbulb20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M4.708 7.083a5.292 5.292 0 1 1 8.5 4.209V12.5a2.375 2.375 0 0 1-2.375 2.375H9.166A2.375 2.375 0 0 1 6.791 12.5v-1.208a5.285 5.285 0 0 1-2.083-4.209Zm3.5 5.417c0 .53.429.958.958.958h1.667c.53 0 .958-.429.958-.958v-1.96l.322-.21a3.875 3.875 0 1 0-4.226 0l.321.21v1.96Z"
                    clipRule="evenodd"
                />
                <path d="M12.375 16.666a.708.708 0 0 1-.709.709H8.333a.708.708 0 1 1 0-1.417h3.333c.391 0 .709.317.709.708Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLightbulb20);
export default Memo;
