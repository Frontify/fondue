import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMicrophone24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMicrophone24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.5 7v3a2.5 2.5 0 0 1-5 0V7a2.5 2.5 0 0 1 5 0ZM8 7a4 4 0 1 1 8 0v3a4 4 0 0 1-8 0V7Zm-1.5 3.75a.75.75 0 0 0-1.5 0c0 1.377.81 3.05 2.011 4.352 1.064 1.153 2.534 2.123 4.239 2.348v1.05h-2a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-2v-1.05c1.705-.225 3.175-1.195 4.239-2.348C18.19 13.8 19 12.127 19 10.75a.75.75 0 0 0-1.5 0c0 .873-.565 2.2-1.613 3.335C14.853 15.205 13.477 16 12 16c-1.476 0-2.853-.796-3.886-1.915C7.065 12.949 6.5 11.623 6.5 10.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMicrophone24);
