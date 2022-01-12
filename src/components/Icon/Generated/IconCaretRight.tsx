import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconCaretRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCaretRight"
            {...props}
        >
            <path d="M8.48 5.138a.83.83 0 0 1-.23-.576.83.83 0 0 1 .23-.576.751.751 0 0 1 1.093 0l7.677 8.034-7.677 8.035a.75.75 0 0 1-1.053-.043.84.84 0 0 1-.04-1.101l6.575-6.89L8.48 5.137Z" />
        </svg>
    );
}

const Memo = memo(IconCaretRight);
export default Memo;
