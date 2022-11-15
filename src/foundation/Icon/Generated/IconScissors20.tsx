import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScissors20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconScissors20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.904 4.907a.75.75 0 0 1-.257 1.029L7.095 12.867a3.138 3.138 0 1 1-.83-1.252L8.958 10 6.265 8.385a3.138 3.138 0 1 1 .83-1.252l3.32 1.992 7.46-4.476a.75.75 0 0 1 1.03.258ZM4.138 7.716a1.638 1.638 0 1 1 0-3.277 1.638 1.638 0 0 1 0 3.277Zm0 7.846a1.638 1.638 0 1 1 0-3.277 1.638 1.638 0 0 1 0 3.277Zm8.047-3.625 1.46-.874 5.002 3.002a.75.75 0 0 1-.772 1.286l-5.69-3.415Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScissors20);
