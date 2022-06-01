import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconInfo12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconInfo12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V10h1.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1H6V6H4.5a.5.5 0 0 1-.5-.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconInfo12);
export default Memo;
