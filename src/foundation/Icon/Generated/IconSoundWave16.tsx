import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconSoundWave16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconSoundWave16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5 13.56V2.444a.5.5 0 1 1 1 0V13.56a.5.5 0 0 1-1 0ZM5.536 11.5v-7a.5.5 0 0 1 1 0v7a.5.5 0 1 1-1 0Zm3.983-7v7a.5.5 0 1 0 1 0v-7a.5.5 0 0 0-1 0Zm-5.3 2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5Zm8.315.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0V7Zm-10.32.002a.5.5 0 0 1 .5.5v1a.5.5 0 1 1-1 0v-1a.5.5 0 0 1 .5-.5ZM14.48 7.5a.5.5 0 1 0-1 0v1a.5.5 0 0 0 1 0v-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconSoundWave16);
export default Memo;
