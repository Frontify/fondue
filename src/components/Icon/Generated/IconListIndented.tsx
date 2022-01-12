import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

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
                d="M21 6a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h12a1 1 0 0 1 1 1ZM7 18a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM19 10a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h10a1 1 0 0 1 1 1ZM21 14a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h12a1 1 0 0 1 1 1Z"
            />
            <path d="M3 6a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V6Z" />
        </svg>
    );
}

const Memo = memo(IconListIndented);
export default Memo;
