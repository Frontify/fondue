import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPills(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconPills"
            {...props}
        >
            <path d="M3 10.5V12h3v-1.5H3zM3 9h3a1.5 1.5 0 0 1 1.5 1.5V12A1.5 1.5 0 0 1 6 13.5H3A1.5 1.5 0 0 1 1.5 12v-1.5A1.5 1.5 0 0 1 3 9zm7.5 1.5V12h3v-1.5h-3zm0-1.5h3a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 12v-1.5A1.5 1.5 0 0 1 10.5 9zm7.5 1.5V12h3v-1.5h-3zM18 9h3a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-1.5A1.5 1.5 0 0 1 18 9z" />
        </svg>
    );
}

const Memo = memo(IconPills);
export default Memo;
