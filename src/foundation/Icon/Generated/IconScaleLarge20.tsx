import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleLarge20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconScaleLarge20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.5 4.5h2v11h-2v-11Zm3.5 11v-11h3v11H9Zm4.5 0h3a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-3v11ZM4 4.5h-.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1H4v-11Zm-3 1A2.5 2.5 0 0 1 3.5 3h13A2.5 2.5 0 0 1 19 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 14.5v-9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleLarge20);
