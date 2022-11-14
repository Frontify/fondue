import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTrashBin24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTrashBin24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.5 4.5h3a.5.5 0 0 1 .5.5v1h-4V5a.5.5 0 0 1 .5-.5ZM8.5 6V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1H19a.75.75 0 0 1 0 1.5h-.5V18a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V7.5H5A.75.75 0 0 1 5 6h3.5Zm7 1.5H7V18a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 17 18V7.5h-1.5Zm-6 9.5v-6.5a.75.75 0 0 1 1.5 0V17a.75.75 0 0 1-1.5 0Zm3.5-6.5V17a.75.75 0 0 0 1.5 0v-6.5a.75.75 0 0 0-1.5 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTrashBin24);
