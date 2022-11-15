import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFaceNeutral16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFaceNeutral16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-9.275-.7a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Zm5.425-.875a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0Zm-6.102 3.603a.5.5 0 1 0 0 1h5.916a.5.5 0 1 0 0-1H5.048Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFaceNeutral16);
