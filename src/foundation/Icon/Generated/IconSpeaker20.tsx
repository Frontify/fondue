import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeaker20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSpeaker20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M11.667 3.522A.833.833 0 0 0 10.28 2.9L6.04 6.666H4.168c-.92 0-1.667.747-1.667 1.667v3.334c0 .92.746 1.666 1.667 1.666h1.875L10.28 17.1a.833.833 0 0 0 1.387-.622V3.522Zm-7.5 4.395h2.349l3.9-3.467v11.1l-3.9-3.467h-2.35a.417.417 0 0 1-.416-.416V8.333c0-.23.187-.416.417-.416Z"
                    clipRule="evenodd"
                />
                <path d="M13.782 5.492c1.517 1.186 2.26 2.672 2.26 4.508 0 1.836-.743 3.322-2.26 4.508a.625.625 0 0 0 .77.984c1.816-1.42 2.74-3.267 2.74-5.492s-.924-4.073-2.74-5.492a.625.625 0 0 0-.77.984Z" />
                <path d="M13.542 10c0-.858-.23-1.549-.69-2.1a.625.625 0 0 1 .962-.8c.653.785.978 1.76.978 2.9s-.325 2.114-.978 2.9a.625.625 0 0 1-.961-.8c.458-.551.689-1.242.689-2.1Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeaker20);
export default Memo;
