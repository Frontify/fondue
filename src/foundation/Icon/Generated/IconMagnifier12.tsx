import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconMagnifier12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMagnifier12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.354 5.677a4.677 4.677 0 1 1-9.354 0 4.677 4.677 0 0 1 9.354 0ZM9.322 10.03a5.677 5.677 0 1 1 .707-.707l1.603 1.602a.5.5 0 1 1-.707.707L9.322 10.03Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMagnifier12);
export default Memo;
