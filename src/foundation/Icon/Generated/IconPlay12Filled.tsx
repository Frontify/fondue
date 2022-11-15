import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlay12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M1.415 9.523V2.527a1 1 0 0 1 1.449-.893l7.004 3.514a1 1 0 0 1-.004 1.79l-7.004 3.48a1 1 0 0 1-1.445-.895Z"
            />
        </svg>
    );
}
export default memo(IconPlay12Filled);
