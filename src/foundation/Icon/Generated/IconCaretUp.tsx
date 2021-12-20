import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCaretUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0.5 0 17 10"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconCaretUp"
            {...props}
        >
            <path d="M15.862 9.064 8.98 2.488 2.09 9.064a.84.84 0 0 1-1.102-.041.75.75 0 0 1-.043-1.053L8.98.293l8.034 7.677a.751.751 0 0 1 0 1.094.83.83 0 0 1-.576.229.83.83 0 0 1-.576-.23Z" />
        </svg>
    );
}

const Memo = memo(IconCaretUp);
export default Memo;
