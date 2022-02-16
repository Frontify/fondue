import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconSoundWave24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconSoundWave24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.25 20.5v-17a.75.75 0 0 1 1.5 0v17a.75.75 0 0 1-1.5 0Zm-3-3v-11a.75.75 0 0 1 1.5 0v11a.75.75 0 0 1-1.5 0Zm6-11v11a.75.75 0 0 0 1.5 0v-11a.75.75 0 0 0-1.5 0ZM6 9.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 6 9.25Zm12.75.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4ZM3 10.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm18.75.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconSoundWave24);
export default Memo;
