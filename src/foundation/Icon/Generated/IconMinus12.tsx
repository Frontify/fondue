import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconMinus12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMinus12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.5 6h-7a.5.5 0 1 1 0-1h7a.5.5 0 0 1 0 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMinus12);
export default Memo;
