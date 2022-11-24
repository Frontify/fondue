import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFaceNeutral24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFaceNeutral24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM8.75 11a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm7.75-1.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM7.782 14.5a.75.75 0 0 0 0 1.5h8.452a.75.75 0 0 0 0-1.5H7.782Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFaceNeutral24Filled);
