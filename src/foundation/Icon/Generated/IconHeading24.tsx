import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeading24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconHeading24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.003 6v9.03h1.703v-3.754H9.06v3.754h1.702V6H9.06v3.728H5.706V6H4.003ZM15.59 7.213v7.817h1.651V6h-2.98l-1.844 4.076h1.728l1.213-2.863h.232ZM3.77 17.5a.75.75 0 0 0 0 1.5h16.474a.75.75 0 0 0 0-1.5H3.77Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeading24);
