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
                d="M8.457 2.296 8 1.273l-.456 1.023-1.56 3.495-3.548.463L1.4 6.39l.753.722L4.83 9.676l-.67 3.736-.193 1.08.942-.563L8 12.082l3.092 1.847.942.563-.194-1.08-.67-3.736 2.676-2.565.753-.722-1.034-.135-3.548-.463-1.56-3.495Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar16Filled);
