import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlay12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.64 2.08a.5.5 0 0 0-.725.447v6.996a.5.5 0 0 0 .723.448L9.642 6.49a.5.5 0 0 0 .001-.895L2.64 2.08Zm-1.725.447a1.5 1.5 0 0 1 2.173-1.34L10.092 4.7c1.105.555 1.102 2.134-.005 2.684l-7.004 3.481A1.5 1.5 0 0 1 .915 9.523V2.527Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlay12);
