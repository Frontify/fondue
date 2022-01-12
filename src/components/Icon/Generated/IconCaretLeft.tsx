import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconCaretLeft(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCaretLeft"
            {...props}
        >
            <path d="M15.52 5.138 8.946 12.02l6.576 6.89a.84.84 0 0 1-.041 1.102.75.75 0 0 1-1.053.043L6.75 12.02l7.677-8.034a.751.751 0 0 1 1.094 0 .83.83 0 0 1 .229.576.83.83 0 0 1-.23.576Z" />
        </svg>
    );
}

const Memo = memo(IconCaretLeft);
export default Memo;
