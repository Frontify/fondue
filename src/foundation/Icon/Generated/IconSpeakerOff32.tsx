import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeakerOff32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconSpeakerOff32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M18.667 5.636a1.334 1.334 0 0 0-2.22-.997l-6.782 6.027H6.667A2.667 2.667 0 0 0 4 13.334v5.334a2.667 2.667 0 0 0 2.667 2.666h3l6.78 6.028a1.334 1.334 0 0 0 2.22-.997V5.636Zm-12 7.03h3.759l6.24-5.546v17.76l-6.239-5.547h-3.76A.667.667 0 0 1 6 18.667v-5.334c0-.368.298-.666.667-.666Z"
                    clipRule="evenodd"
                />
                <path d="m22.695 16-2.032 2.421a1 1 0 0 0 1.532 1.286L24 17.556l1.805 2.151a1 1 0 1 0 1.532-1.286l-2.032-2.42 2.032-2.422a1 1 0 0 0-1.532-1.286L24 14.444l-1.805-2.15a1 1 0 1 0-1.532 1.285L22.695 16Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeakerOff32);
export default Memo;
