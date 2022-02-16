import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashBin24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTrashBin24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8.754 10.182a.91.91 0 0 1 1.819 0v7.272a.91.91 0 1 1-1.819 0v-7.272Zm5.455-.909a.91.91 0 0 0-.91.909v7.272a.91.91 0 1 0 1.819 0v-7.272a.91.91 0 0 0-.91-.91Z" />
                <path
                    fillRule="evenodd"
                    d="M13.754 2h-3.636A1.818 1.818 0 0 0 8.3 3.818v1.818H4.209a.91.91 0 1 0 0 1.819h.454v11.818A2.727 2.727 0 0 0 7.391 22h9.09a2.727 2.727 0 0 0 2.728-2.727V7.455h.633a.91.91 0 1 0 0-1.819h-4.27V3.818A1.818 1.818 0 0 0 13.755 2ZM6.482 7.455H17.39v11.818a.91.91 0 0 1-.91.909H7.39a.91.91 0 0 1-.91-.91V7.456Zm3.636-1.819V3.818h3.636v1.818h-3.636Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTrashBin24);
export default Memo;
