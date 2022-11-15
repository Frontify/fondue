import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleSmall12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconScaleSmall12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 4H6v4h3V4Zm0-1h1.5A1.5 1.5 0 0 1 12 4.5v3A1.5 1.5 0 0 1 10.5 9h-9A1.5 1.5 0 0 1 0 7.5v-3A1.5 1.5 0 0 1 1.5 3H9Zm1 5h.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H10v4ZM1.5 8H5V4H1.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleSmall12);
