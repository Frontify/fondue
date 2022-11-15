import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowOutShare32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowOutShare32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.793 9.243a1 1 0 1 0 1.414-1.414l-3.535-3.536-.708-.707-.707.707-3.535 3.536a1 1 0 0 0 1.414 1.414L15 7.379V20a1 1 0 0 0 2 0V7.45l1.793 1.793ZM6 16a4 4 0 0 1 4-4h1.077a1 1 0 1 1 0 2H10a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-.692a1 1 0 0 1 0-2H22a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowOutShare32);
