import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMusicNote32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMusicNote32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 6a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v16a.942.942 0 0 1-.013.16A4.5 4.5 0 1 1 26 18.758V11H13v11a.942.942 0 0 1-.013.16A4.5 4.5 0 1 1 11 18.758V6Zm2 3h13V7H13v2Zm-2 13.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm15 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMusicNote32);
