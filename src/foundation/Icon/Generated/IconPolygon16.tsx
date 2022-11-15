import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPolygon16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPolygon16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m8 1.904.3.225 5.507 4.13.277.208-.096.332-2.003 6.884-.105.36H4.12l-.105-.36L2.013 6.8l-.097-.332.277-.208L7.7 2.13l.3-.225ZM3.07 6.852l1.8 6.191h6.26l1.8-6.191L8 3.154 3.07 6.852Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPolygon16);
