import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconLines12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLines12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M.917 3.5a.5.5 0 0 1 .5-.5h9.166a.5.5 0 0 1 0 1H1.417a.5.5 0 0 1-.5-.5Zm0 2.5a.5.5 0 0 1 .5-.5h9.166a.5.5 0 0 1 0 1H1.417a.5.5 0 0 1-.5-.5Zm.5 2a.5.5 0 0 0 0 1h9.166a.5.5 0 0 0 0-1H1.417Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLines12);
export default Memo;
