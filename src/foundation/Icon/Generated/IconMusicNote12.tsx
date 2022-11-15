import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMusicNote12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMusicNote12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 1.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5V9a2 2 0 1 1-1-1.732V4.047H5.227A.498.498 0 0 1 5 3.993V9a2 2 0 1 1-1-1.732V1.5Zm1 1.601a.498.498 0 0 1 .227-.054H10V2H5v1.101ZM9 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM3 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMusicNote12);
