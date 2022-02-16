import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMusicNote16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMusicNote16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.333 4.97v6.61a.55.55 0 0 1-.007.088 2.49 2.49 0 0 1-2.493 2.665 2.49 2.49 0 0 1-2.5-2.478 2.49 2.49 0 0 1 2.5-2.478 2.5 2.5 0 0 1 1.389.417V2.217c0-.304.249-.55.555-.55h8.334c.307 0 .555.246.555.55v9.363c0 .03-.002.059-.007.088a2.49 2.49 0 0 1-2.493 2.665 2.49 2.49 0 0 1-2.5-2.478 2.49 2.49 0 0 1 2.5-2.478c.514 0 .992.153 1.39.417V4.971H6.332Zm0-1.1h7.222V2.767H6.333v1.101Zm-1.111 7.985c0 .76-.622 1.377-1.389 1.377a1.383 1.383 0 0 1-1.389-1.377c0-.76.622-1.377 1.389-1.377s1.389.617 1.389 1.377Zm8.333 0c0 .76-.622 1.377-1.389 1.377a1.383 1.383 0 0 1-1.389-1.377c0-.76.622-1.377 1.39-1.377.766 0 1.388.617 1.388 1.377Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMusicNote16);
export default Memo;
