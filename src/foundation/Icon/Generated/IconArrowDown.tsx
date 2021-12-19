import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowDown(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconArrowDown"
            {...props}
        >
            <path d="m13.03 18.498 5.43-5.428a1.026 1.026 0 1 1 1.45 1.45l-7.18 7.18c-.4.4-1.05.4-1.45 0L4.1 14.52a1.026 1.026 0 1 1 1.45-1.45l5.43 5.428V3.026a1.026 1.026 0 1 1 2.05 0v15.472Z" />
        </svg>
    );
}

const Memo = memo(IconArrowDown);
export default Memo;
