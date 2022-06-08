import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconFaceNeutral12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFaceNeutral12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0Zm-8.25-.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM4 8a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceNeutral12);
export default Memo;
