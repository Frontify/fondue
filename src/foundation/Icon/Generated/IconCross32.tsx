import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCross32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={46}
            height={46}
            className={customClassName}
            name="IconCross32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.53 15.093a1.016 1.016 0 1 0-1.437 1.438L21.562 23l-6.47 6.469a1.016 1.016 0 1 0 1.438 1.437L23 24.437l6.468 6.469a1.017 1.017 0 0 0 1.438-1.438L24.437 23l6.468-6.469a1.017 1.017 0 0 0-1.437-1.437L23 21.562l-6.47-6.469Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCross32);
