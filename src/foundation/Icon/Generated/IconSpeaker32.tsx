import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeaker32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconSpeaker32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M18.667 5.636a1.334 1.334 0 0 0-2.22-.997l-6.782 6.027H6.667A2.667 2.667 0 0 0 4 13.334v5.334a2.667 2.667 0 0 0 2.667 2.666h3l6.78 6.028a1.334 1.334 0 0 0 2.22-.997V5.636Zm-12 7.03h3.759l6.24-5.546v17.76l-6.239-5.547h-3.76A.667.667 0 0 1 6 18.667v-5.334c0-.368.298-.666.667-.666Z"
                    clipRule="evenodd"
                />
                <path d="M22.05 8.788c2.428 1.897 3.617 4.275 3.617 7.212 0 2.937-1.19 5.315-3.616 7.212a1 1 0 1 0 1.232 1.576c2.906-2.272 4.384-5.228 4.384-8.788 0-3.56-1.478-6.516-4.385-8.788a1 1 0 1 0-1.231 1.576Z" />
                <path d="M21.667 16c0-1.372-.369-2.478-1.103-3.36a1 1 0 1 1 1.538-1.28c1.044 1.257 1.565 2.817 1.565 4.64 0 1.823-.52 3.383-1.565 4.64a1 1 0 1 1-1.538-1.28c.734-.882 1.103-1.988 1.103-3.36Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeaker32);
export default Memo;
