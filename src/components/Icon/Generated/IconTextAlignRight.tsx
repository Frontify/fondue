import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconTextAlignRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTextAlignRight"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.662 6a1 1 0 0 1-1 1h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1ZM5.662 18a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2h-13a1 1 0 0 1-1-1ZM20.662 10a1 1 0 0 1-1 1h-13a1 1 0 1 1 0-2h13a1 1 0 0 1 1 1ZM20.662 14a1 1 0 0 1-1 1h-16a1 1 0 1 1 0-2h16a1 1 0 0 1 1 1Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignRight);
export default Memo;
