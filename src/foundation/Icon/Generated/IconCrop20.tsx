import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrop20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCrop20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.25 2a.75.75 0 0 1 .75.75V4.5h6.25c.626 0 1.21.177 1.707.484L16.05 2.89a.797.797 0 0 1 1.087-.028c.307.278.32.74.026 1.033l-2.147 2.147a3.23 3.23 0 0 1 .484 1.707V14h1.75a.75.75 0 0 1 0 1.5H15.5v1.75a.75.75 0 0 1-1.5 0V15.5H7.75a3.25 3.25 0 0 1-3.25-3.25V6H2.75a.75.75 0 0 1 0-1.5H4.5V2.75A.75.75 0 0 1 5.25 2Zm7.59 4.102A1.747 1.747 0 0 0 12.25 6H6v6.25c0 .207.036.405.102.59l6.737-6.738Zm-5.68 7.796 6.738-6.737c.066.184.102.382.102.589V14H7.75a1.75 1.75 0 0 1-.59-.102Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrop20);
