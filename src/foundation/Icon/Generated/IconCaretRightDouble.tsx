import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCaretRightDouble(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCaretRightDouble"
            {...props}
        >
            <path fill="currentColor" d="M12.53 4.47a.75.75 0 00-1.06 1.06L17.94 12l-6.47 6.47a.75.75 0 101.06 1.06l7-7 .53-.53-.53-.53-7-7Zm-7 0a.75.75 0 00-1.06 1.06L10.94 12l-6.47 6.47a.75.75 0 101.06 1.06l7-7 .53-.53-.53-.53-7-7Z" />
        </svg>
    );
}

const Memo = memo(IconCaretRightDouble);
export default Memo;
