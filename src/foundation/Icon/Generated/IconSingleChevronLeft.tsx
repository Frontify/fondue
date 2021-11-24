import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSingleChevronLeft(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 10 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSingleChevronLeft"
            {...props}
        >
            <path d="M9.506 12L.62 7.264V4.763L9.506 0h.16v2.235L2.695 5.854v.319l6.97 3.619V12h-.159z" />
        </svg>
    );
}

const MemoIconSingleChevronLeft = React.memo(IconSingleChevronLeft);
export default MemoIconSingleChevronLeft;
