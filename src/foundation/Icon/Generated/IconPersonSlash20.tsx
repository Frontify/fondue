import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPersonSlash20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPersonSlash20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.776 5.504a3.766 3.766 0 1 0-6.188 3.575A6.59 6.59 0 0 0 3.5 15.177v.603l1.597-1.597a5.094 5.094 0 0 1 3.998-3.998L10.9 8.38a2.265 2.265 0 1 1 1.302-1.302l1.573-1.573Zm-1.208 5.228L6.8 16.5h8.376v-1.323a5.087 5.087 0 0 0-2.608-4.445ZM5.3 18l-.77.77a.75.75 0 1 1-1.06-1.061l12.939-12.94a.75.75 0 0 1 1.06 1.061L13.66 9.64a6.583 6.583 0 0 1 3.016 5.537V18H5.3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPersonSlash20);
