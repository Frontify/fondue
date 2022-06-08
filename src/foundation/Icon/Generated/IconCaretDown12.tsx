import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconCaretDown12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCaretDown12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.796 3.322a.5.5 0 0 1 0 .707L6.353 8.472l-.354.354-.353-.354L1.204 4.03a.5.5 0 0 1 .707-.707L6 7.412l4.09-4.09a.5.5 0 0 1 .707 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconCaretDown12);
export default Memo;
