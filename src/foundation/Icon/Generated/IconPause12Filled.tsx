import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPause12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPause12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2.167a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H2Zm5.833 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1H10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H7.833Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPause12Filled);
