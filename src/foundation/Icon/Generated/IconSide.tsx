import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSide(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconSide"
            {...props}
        >
            <path d="M9.65 4.85H6A1.15 1.15 0 0 0 4.85 6v12c0 .635.515 1.15 1.15 1.15h3.65V4.85Zm1.7 0v14.3H18A1.15 1.15 0 0 0 19.15 18V6A1.15 1.15 0 0 0 18 4.85h-6.65ZM6 3.15h12A2.85 2.85 0 0 1 20.85 6v12A2.85 2.85 0 0 1 18 20.85H6A2.85 2.85 0 0 1 3.15 18V6A2.85 2.85 0 0 1 6 3.15Z" />
        </svg>
    );
}

const Memo = memo(IconSide);
export default Memo;
