import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedWidth12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFixedWidth12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.5 2.25a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-1 0v-6.5a.5.5 0 0 1 .5-.5ZM8.545 6a.5.5 0 0 1-.5.5H3.954a.5.5 0 0 1 0-1h4.091a.5.5 0 0 1 .5.5ZM2 2.75a.5.5 0 0 0-1 0v6.5a.5.5 0 0 0 1 0v-6.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedWidth12);
