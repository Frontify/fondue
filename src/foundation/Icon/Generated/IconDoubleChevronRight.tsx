import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoubleChevronRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconDoubleChevronRight"
            {...props}
        >
            <path d="M7.799 12V9.727l5.841-3.568V5.84L7.799 2.247V0h.158l7.612 4.784v2.432L7.957 12H7.8ZM.715 9.727l5.868-3.568V5.84L.715 2.247V0h.158l7.64 4.784v2.432L.872 12H.715V9.727Z" />
        </svg>
    );
}

const Memo = memo(IconDoubleChevronRight);
export default Memo;
