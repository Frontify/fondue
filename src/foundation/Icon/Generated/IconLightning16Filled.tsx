import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightning16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLightning16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M9.594 1.66 2.64 8.772c-.311.318-.092.862.348.863l3.847.012-1.423 4.174c-.173.507.445.904.816.524L13.36 7.05c.312-.319.091-.863-.35-.863H9.07l1.34-4.006c.17-.507-.446-.9-.816-.521Z"
            />
        </svg>
    );
}
export default memo(IconLightning16Filled);
