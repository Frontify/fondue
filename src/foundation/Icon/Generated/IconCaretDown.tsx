import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCaretDown(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCaretDown"
            {...props}
        >
            <path d="M18.862 8.48a.83.83 0 0 1 .576-.23.83.83 0 0 1 .576.23.751.751 0 0 1 0 1.093L11.98 17.25 3.945 9.573a.75.75 0 0 1 .043-1.053.84.84 0 0 1 1.101-.04l6.89 6.575 6.883-6.576Z" />
        </svg>
    );
}

const Memo = memo(IconCaretDown);
export default Memo;
