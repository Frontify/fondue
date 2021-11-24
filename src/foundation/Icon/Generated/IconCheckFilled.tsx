import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCheckFilled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCheckFilled"
            {...props}
        >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.047-9.182a.704.704 0 000 .996l2.529 2.529 5.547-5.547a.718.718 0 00-1.015-1.014l-4.532 4.55-1.53-1.517a.708.708 0 00-1 .003z" />
        </svg>
    );
}

const MemoIconCheckFilled = React.memo(IconCheckFilled);
export default MemoIconCheckFilled;
