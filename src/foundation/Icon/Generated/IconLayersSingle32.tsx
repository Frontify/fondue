import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLayersSingle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLayersSingle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25.988 16 16 10.184 6.012 16 16 21.817 25.988 16Zm-8.982-7.545a2 2 0 0 0-2.013 0l-11.472 6.68a1 1 0 0 0 0 1.73l11.472 6.68a2 2 0 0 0 2.013 0l11.472-6.68a1 1 0 0 0 0-1.73l-11.472-6.68Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLayersSingle32);
