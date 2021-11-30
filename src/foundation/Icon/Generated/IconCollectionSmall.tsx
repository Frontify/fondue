import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCollectionSmall(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCollectionSmall"
            {...props}
        >
            <path d="M8.65 13.3V9.7H5a.3.3 0 0 0-.3.3v3a.3.3 0 0 0 .3.3h3.65zm1.7 0H19a.3.3 0 0 0 .3-.3v-3a.3.3 0 0 0-.3-.3h-8.65v3.6zM5 8h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" />
        </svg>
    );
}

const Memo = memo(IconCollectionSmall);
export default Memo;
