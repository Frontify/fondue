import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleLarge32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconScaleLarge32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 8h3v16H9V8Zm5 16V8h4v16h-4Zm6 0h5a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-5v16ZM7 8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2V8Zm-4 2a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleLarge32);
