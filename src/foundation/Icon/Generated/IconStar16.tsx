import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStar16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m8 1.273.456 1.023 1.56 3.495 3.549.463 1.034.135-.753.722-2.676 2.565.67 3.736.194 1.08-.943-.563L8 12.082 4.908 13.93l-.942.563.194-1.08.67-3.736L2.154 7.11 1.4 6.39l1.034-.135 3.548-.463 1.56-3.495L8 1.273Zm0 2.454L6.782 6.454l-.114.256-.277.036-2.792.365 2.116 2.028.194.186-.047.263-.524 2.92 2.405-1.437.257-.153.256.153 2.406 1.437-.524-2.92-.047-.263.193-.186 2.117-2.028-2.792-.365-.278-.036-.114-.256L8 3.727Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar16);
