import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlus16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlus16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 0-1 0v5H2a.5.5 0 0 0 0 1h5v5a.5.5 0 0 0 1 0V8h5a.5.5 0 0 0 0-1H8V2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlus16);
