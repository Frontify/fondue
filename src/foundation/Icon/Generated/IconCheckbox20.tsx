import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckbox20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCheckbox20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 3.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1ZM2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5v-11Zm5.014 5.72a.75.75 0 1 0-1.06 1.06l2.151 2.152.53.53.53-.53 5.425-5.424a.75.75 0 0 0-1.06-1.061L8.635 11.84l-1.621-1.62Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckbox20);
