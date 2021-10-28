import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOpenLock(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconOpenLock"
            {...props}
        >
            <path d="M11.2 15.944a1.666 1.666 0 111.667 0V17a.833.833 0 01-1.667 0v-1.056zm4.167-7.277v-2.5a2.5 2.5 0 00-2.5-2.5H11.2a2.5 2.5 0 00-2.5 2.5.833.833 0 11-1.667 0A4.167 4.167 0 0111.2 2h1.667a4.167 4.167 0 014.166 4.167v2.5h.834a2.5 2.5 0 012.5 2.5V19.5a2.5 2.5 0 01-2.5 2.5H6.2a2.5 2.5 0 01-2.5-2.5v-8.333a2.5 2.5 0 012.5-2.5h9.167zM6.2 10.333a.833.833 0 00-.833.834V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833v-8.333a.833.833 0 00-.833-.834H6.2z" />
        </svg>
    );
}

const MemoIconOpenLock = React.memo(IconOpenLock);
export default MemoIconOpenLock;
