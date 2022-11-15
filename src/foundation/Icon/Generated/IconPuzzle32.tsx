import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPuzzle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPuzzle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 10H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-1a4 4 0 0 1 8 0v1h3a1 1 0 0 0 1-1v-5h3a2 2 0 1 0 0-4h-3v-5a1 1 0 0 0-1-1h-5V7a2 2 0 1 0-4 0v3Zm12 14v-2h1a4 4 0 0 0 0-8h-1v-3a3 3 0 0 0-3-3h-3V7a4 4 0 0 0-8 0v1H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h5v-3a2 2 0 1 1 4 0v3h5a3 3 0 0 0 3-3v-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPuzzle32);
