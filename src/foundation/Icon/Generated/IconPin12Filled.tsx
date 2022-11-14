import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPin12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPin12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.633 1.012a1.015 1.015 0 0 0-1.544.144L5.3 3.752l-2.306.387c-.806.135-1.121 1.111-.543 1.682l1.546 1.526a.505.505 0 0 0-.07.058l-2.78 2.743a.492.492 0 0 0 0 .702.508.508 0 0 0 .712 0l2.779-2.742a.5.5 0 0 0 .059-.07l1.416 1.398c.578.57 1.567.259 1.704-.537l.392-2.276 2.63-1.765a.986.986 0 0 0 .146-1.524L8.633 1.012Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPin12Filled);
