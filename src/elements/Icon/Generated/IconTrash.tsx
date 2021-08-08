import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconTrash(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M17.39 7.455H6.483v11.818c0 .502.407.909.909.909h9.09a.91.91 0 00.91-.91V7.456zM4.665 5.636H8.3V3.818C8.3 2.814 9.114 2 10.118 2h3.637c1.004 0 1.818.814 1.818 1.818v1.818h4.269a.91.91 0 010 1.819h-.633v11.818A2.727 2.727 0 0116.482 22H7.39a2.727 2.727 0 01-2.727-2.727V7.455h-.455a.91.91 0 110-1.819h.455zm5.454 0h3.637V3.818h-3.637v1.818zm-1.363 4.546a.91.91 0 111.818 0v7.273a.91.91 0 01-1.818 0v-7.273zm4.545 0a.91.91 0 011.818 0v7.273a.91.91 0 11-1.818 0v-7.273z" />
        </svg>
    );
}

const MemoIconTrash = React.memo(IconTrash);
export default MemoIconTrash;
