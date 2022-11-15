import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPin20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPin20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.058 2.877a2.523 2.523 0 0 0-3.85.36L8.95 6.531l-2.945.496C4.398 7.298 3.77 9.256 4.922 10.4l1.933 1.918a.757.757 0 0 0-.07.062l-4.531 4.494a.743.743 0 0 0 0 1.056.757.757 0 0 0 1.065 0l4.53-4.494a.76.76 0 0 0 .063-.07l1.801 1.787c1.153 1.144 3.127.52 3.4-1.075l.5-2.92 3.32-2.24a2.477 2.477 0 0 0 .364-3.82l-2.239-2.22Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPin20Filled);
