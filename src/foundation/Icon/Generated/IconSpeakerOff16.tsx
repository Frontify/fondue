import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeakerOff16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconSpeakerOff16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M9.333 2.818a.667.667 0 0 0-1.11-.498l-3.39 3.013h-1.5C2.597 5.333 2 5.93 2 6.667v2.666c0 .737.597 1.334 1.333 1.334h1.5l3.39 3.013a.667.667 0 0 0 1.11-.498V2.818Zm-6 3.515h1.88l3.12-2.773v8.88l-3.12-2.774h-1.88A.333.333 0 0 1 3 9.334V6.667c0-.185.15-.334.333-.334Z"
                    clipRule="evenodd"
                />
                <path d="m11.347 8-1.016 1.21a.5.5 0 0 0 .766.643L12 8.778l.902 1.075a.5.5 0 0 0 .767-.642L12.653 8l1.016-1.21a.5.5 0 1 0-.767-.644L12 7.222l-.903-1.076a.5.5 0 1 0-.766.643L11.347 8Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeakerOff16);
export default Memo;
