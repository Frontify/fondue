import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSoundWave12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSoundWave12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.502 10.982v-9.97a.5.5 0 1 1 1 0v9.97a.5.5 0 1 1-1 0ZM2.81 8.5v-5a.5.5 0 0 1 1 0v5a.5.5 0 1 1-1 0Zm5.385-5v5a.5.5 0 1 0 1 0v-5a.5.5 0 0 0-1 0ZM.618 5.06a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5Zm11.27.441a.5.5 0 0 0-1 0v1a.5.5 0 1 0 1 0v-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconSoundWave12);
export default Memo;
