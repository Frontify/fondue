import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconSingleChevronRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconSingleChevronRight"
            {...props}
        >
            <path d="m.78 0 8.886 4.736v2.501L.779 12H.62V9.765l6.972-3.619v-.319L.619 2.208V0h.16Z" />
        </svg>
    );
}

const Memo = memo(IconSingleChevronRight);
export default Memo;
