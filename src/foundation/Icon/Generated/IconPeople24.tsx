import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPeople24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPeople24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM13 8a3.99 3.99 0 0 1-1.368 3.012A7.002 7.002 0 0 1 16 17.5V19h4.206v-1.008a4.354 4.354 0 0 0-3.706-4.306v-2.328a1.845 1.845 0 1 0-1.346-3.435V6.359a3.345 3.345 0 0 1 2.529 6.071 5.855 5.855 0 0 1 4.023 5.562V20.5H2v-3a7.002 7.002 0 0 1 4.368-6.488A4 4 0 1 1 13 8Zm-3 11h4.5v-1.5a5.5 5.5 0 1 0-11 0V19H10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPeople24);
