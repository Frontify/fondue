import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrop24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCrop24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.25 3a.75.75 0 0 1 .75.75V5.5h7.75c.765 0 1.476.229 2.069.622l2.378-2.379a.798.798 0 0 1 1.087-.027c.308.277.32.74.027 1.033L17.878 7.18c.393.593.622 1.304.622 2.069V17h1.75a.75.75 0 0 1 0 1.5H18.5v1.75a.75.75 0 0 1-1.5 0V18.5H9.25a3.75 3.75 0 0 1-3.75-3.75V7H3.75a.75.75 0 0 1 0-1.5H5.5V3.75A.75.75 0 0 1 6.25 3Zm9.471 4.22A2.241 2.241 0 0 0 14.75 7H7v7.75c0 .348.079.677.22.971l8.5-8.501Zm-7.442 9.56 8.501-8.5c.141.294.22.623.22.971V17H9.25c-.348 0-.677-.079-.971-.22Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrop24);
