import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconCrossCircle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCrossCircle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 26c5.523 0 10-4.477 10-10S21.523 6 16 6 6 10.477 6 16s4.477 10 10 10Zm0 2c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Zm-4.945-16.997a1 1 0 0 1 1.414 0l3.557 3.557 3.514-3.514a1 1 0 0 1 1.414 1.414l-3.514 3.514 3.514 3.514a1 1 0 1 1-1.414 1.415l-3.514-3.514-3.557 3.556a1 1 0 0 1-1.414-1.414l3.556-3.557-3.556-3.557a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconCrossCircle32);
export default Memo;
