import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStar16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.456 2.296 8 1.273l-.457 1.023-1.56 3.495-3.548.463-1.034.135.753.722L4.83 9.676l-.67 3.736-.194 1.08.942-.563L8 12.082l3.091 1.847.943.563-.194-1.08-.67-3.736 2.676-2.565.753-.722-1.034-.135-3.549-.463-1.56-3.495Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar16Filled);
