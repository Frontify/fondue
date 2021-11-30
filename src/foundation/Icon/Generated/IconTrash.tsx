import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrash(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTrash"
            {...props}
        >
            <path d="M17.39 7.455H6.483v11.818c0 .502.407.909.909.909h9.09a.91.91 0 0 0 .91-.91V7.456ZM4.665 5.636H8.3V3.818C8.3 2.814 9.114 2 10.118 2h3.637c1.004 0 1.818.814 1.818 1.818v1.818h4.269a.91.91 0 0 1 0 1.819h-.633v11.818A2.727 2.727 0 0 1 16.482 22H7.39a2.727 2.727 0 0 1-2.727-2.727V7.455h-.455a.91.91 0 1 1 0-1.819h.455Zm5.454 0h3.637V3.818h-3.637v1.818Zm-1.363 4.546a.91.91 0 1 1 1.818 0v7.273a.91.91 0 0 1-1.818 0v-7.273Zm4.545 0a.91.91 0 0 1 1.818 0v7.273a.91.91 0 1 1-1.818 0v-7.273Z" />
        </svg>
    );
}

const Memo = memo(IconTrash);
export default Memo;
