import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconPointout12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPointout12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.5 2h9a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM0 2.5A1.5 1.5 0 0 1 1.5 1h9A1.5 1.5 0 0 1 12 2.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 0 9.5v-7ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm1 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPointout12);
export default Memo;
