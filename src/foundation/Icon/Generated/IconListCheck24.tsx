import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListCheck24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconListCheck24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21 5.75a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 .75.75Zm-10 12.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Zm8-8.357a.75.75 0 0 1-.75.75h-6.5a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 .75.75Zm2 4.16a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 .75.75ZM5.64 9.06l-.966-1.136a.75.75 0 1 0-1.143.972l1.487 1.747a.95.95 0 0 0 1.559-.163l2.328-4.299a.75.75 0 0 0-1.32-.714L5.64 9.06ZM4.5 14.5v3h3v-3h-3ZM4 13a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListCheck24);
export default Memo;
