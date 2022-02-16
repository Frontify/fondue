import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPause16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPause16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.762 2.667c.316 0 .572.265.572.592v9.482a.582.582 0 0 1-.572.592H3.905a.582.582 0 0 1-.571-.592V3.259c0-.327.255-.592.57-.592h2.858Zm-.229.83h-2.4v9.007h2.4V3.496Zm5.562-.83c.316 0 .572.265.572.592v9.482a.582.582 0 0 1-.572.592H9.238a.582.582 0 0 1-.571-.592V3.259c0-.327.256-.592.571-.592h2.857Zm-.228.83h-2.4v9.007h2.4V3.496Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPause16);
export default Memo;
