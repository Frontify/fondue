import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleSmall24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconScaleSmall24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 8.5h-4.5v7H16v-7Zm1.5 0v7h2a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-2Zm-13 0H10v7H4.5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Zm0-1.5A2.5 2.5 0 0 0 2 9.5v5A2.5 2.5 0 0 0 4.5 17h15a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 19.5 7h-15Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleSmall24);
