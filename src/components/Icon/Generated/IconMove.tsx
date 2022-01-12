import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconMove(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconMove"
            {...props}
        >
            <path d="M3 8a1 1 0 1 1 0-2h18a1 1 0 0 1 0 2H3Zm0 5a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2H3Zm0 5a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2H3Z" />
        </svg>
    );
}

const Memo = memo(IconMove);
export default Memo;
