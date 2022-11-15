import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFaceNeutral16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFaceNeutral16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM5.725 7.3a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Zm5.425-.875a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0Zm-6.102 3.603a.5.5 0 1 0 0 1h5.916a.5.5 0 1 0 0-1H5.048Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFaceNeutral16Filled);
