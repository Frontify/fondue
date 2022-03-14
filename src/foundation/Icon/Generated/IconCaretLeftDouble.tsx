import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCaretLeftDouble(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCaretLeftDouble"
            {...props}
        >
            <path fill="currentColor" d="M19.53 5.53a.75.75 0 10-1.06-1.06l-7 7-.53.53.53.53 7 7a.75.75 0 001.06-1.06L13.062 12l6.47-6.47Zm-7 0a.75.75 0 10-1.06-1.06l-7 7-.53.53.53.53 7 7a.75.75 0 101.06-1.06L6.06 12l6.47-6.47Z" />
        </svg>
    );
}

const Memo = memo(IconCaretLeftDouble);
export default Memo;
