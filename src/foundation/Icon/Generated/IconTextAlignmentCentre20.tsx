import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconTextAlignmentCentre20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextAlignmentCentre20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.75 5.5a.75.75 0 0 1 0-1.5h14.5a.75.75 0 0 1 0 1.5H2.75Zm0 7a.75.75 0 0 1 0-1.5h14.5a.75.75 0 0 1 0 1.5H2.75Zm1.5-4.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H5a.75.75 0 0 0-.75.75ZM5 16a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5H5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentCentre20);
export default Memo;
