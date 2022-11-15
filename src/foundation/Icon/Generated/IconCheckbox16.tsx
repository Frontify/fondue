import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckbox16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCheckbox16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 3h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm3.914 4.718a.5.5 0 0 0-.707.707l1.445 1.444.353.354.354-.354 4.01-4.01a.5.5 0 1 0-.707-.707L7.005 9.809l-1.09-1.091Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckbox16);
