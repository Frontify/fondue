import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconCaretDown(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M18.862 8.48a.83.83 0 01.576-.23.83.83 0 01.576.23.751.751 0 010 1.093L11.98 17.25 3.945 9.573a.75.75 0 01.043-1.053.84.84 0 011.101-.04l6.89 6.575 6.883-6.576z" />
        </svg>
    );
}

const MemoIconCaretDown = React.memo(IconCaretDown);
export default MemoIconCaretDown;
