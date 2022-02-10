import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeakerOff24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconSpeakerOff24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M14 4.227a1 1 0 0 0-1.664-.748L7.249 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.25l5.086 4.52A1 1 0 0 0 14 19.773V4.227ZM5 9.5h2.82l4.68-4.16v13.32L7.82 14.5H5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Z"
                    clipRule="evenodd"
                />
                <path d="m17.02 12-1.523 1.816a.75.75 0 1 0 1.15.964L18 13.167l1.354 1.613a.75.75 0 1 0 1.149-.964L18.979 12l1.524-1.816a.75.75 0 0 0-1.15-.964L18 10.833 16.646 9.22a.75.75 0 1 0-1.149.964L17.021 12Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeakerOff24);
export default Memo;
