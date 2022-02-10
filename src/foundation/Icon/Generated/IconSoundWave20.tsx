import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSoundWave20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconSoundWave20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.25 17.299v-14.6a.75.75 0 0 1 1.5 0v14.6a.75.75 0 0 1-1.5 0ZM6.507 15V5a.75.75 0 0 1 1.5 0v10a.75.75 0 0 1-1.5 0Zm5.477-10v10a.75.75 0 0 0 1.5 0V5a.75.75 0 0 0-1.5 0ZM4.551 7.75a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm11.647.75a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3Zm-14.35.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm17.058.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconSoundWave20);
export default Memo;
