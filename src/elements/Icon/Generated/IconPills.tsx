import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconPills(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
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
            <path d="M3 10.5V12h3v-1.5H3zM3 9h3a1.5 1.5 0 011.5 1.5V12A1.5 1.5 0 016 13.5H3A1.5 1.5 0 011.5 12v-1.5A1.5 1.5 0 013 9zm7.5 1.5V12h3v-1.5h-3zm0-1.5h3a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 12v-1.5A1.5 1.5 0 0110.5 9zm7.5 1.5V12h3v-1.5h-3zM18 9h3a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-1.5A1.5 1.5 0 0118 9z" />
        </svg>
    );
}

const MemoIconPills = React.memo(IconPills);
export default MemoIconPills;
