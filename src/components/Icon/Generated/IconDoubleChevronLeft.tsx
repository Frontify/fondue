import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDoubleChevronLeft(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconDoubleChevronLeft"
            {...props}
        >
            <path d="M8.487 0v2.273L2.645 5.841v.318l5.842 3.594V12h-.159L.716 7.216V4.784L8.328 0h.159Zm7.083 2.273L9.702 5.841v.318l5.868 3.594V12h-.158L7.773 7.216V4.784L15.412 0h.158v2.273Z" />
        </svg>
    );
}

const Memo = memo(IconDoubleChevronLeft);
export default Memo;
