import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlusFrame32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlusFrame32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25 6H7a2 2 0 0 0-2 2v1h22V8a2 2 0 0 0-2-2Zm2 5H5v13a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V11ZM7 4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H7Zm9.875 11a1 1 0 1 0-2 0v2.375H12.5a1 1 0 1 0 0 2h2.375V22a1 1 0 1 0 2 0v-2.625H19.5a1 1 0 1 0 0-2h-2.625V15Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlusFrame32);
