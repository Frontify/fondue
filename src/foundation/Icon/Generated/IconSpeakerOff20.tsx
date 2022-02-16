import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeakerOff20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSpeakerOff20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M11.667 3.522A.833.833 0 0 0 10.28 2.9L6.04 6.666H4.168c-.92 0-1.667.747-1.667 1.667v3.334c0 .92.746 1.666 1.667 1.666h1.875L10.28 17.1a.833.833 0 0 0 1.387-.622V3.522Zm-7.5 4.395h2.349l3.9-3.467v11.1l-3.9-3.467h-2.35a.417.417 0 0 1-.416-.416V8.333c0-.23.187-.416.417-.416Z"
                    clipRule="evenodd"
                />
                <path d="m14.184 10-1.27 1.513a.625.625 0 0 0 .958.804L15 10.972l1.128 1.345a.625.625 0 1 0 .958-.804L15.816 10l1.27-1.513a.625.625 0 1 0-.958-.804L15 9.028l-1.128-1.345a.625.625 0 0 0-.958.804L14.184 10Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeakerOff20);
export default Memo;
