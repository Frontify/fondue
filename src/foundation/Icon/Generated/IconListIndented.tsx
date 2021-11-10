import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListIndented(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconListIndented"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 6a1 1 0 01-1 1H8a1 1 0 110-2h12a1 1 0 011 1zM7 18a1 1 0 011-1h10a1 1 0 110 2H8a1 1 0 01-1-1zM19 10a1 1 0 01-1 1H8a1 1 0 110-2h10a1 1 0 011 1zM21 14a1 1 0 01-1 1H8a1 1 0 110-2h12a1 1 0 011 1z"
            />
            <path d="M3 6a1 1 0 012 0v12a1 1 0 11-2 0V6z" />
        </svg>
    );
}

const MemoIconListIndented = React.memo(IconListIndented);
export default MemoIconListIndented;
