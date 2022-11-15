import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeartCircle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHeartCircle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm1.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.866 8.03c.343-.343.558-.38.638-.386.105-.008.258.02.472.144.216.125.42.307.582.48a3.157 3.157 0 0 1 .21.249l.003.004a1.5 1.5 0 0 0 2.458 0l.004-.004.036-.048a3.1 3.1 0 0 1 .173-.2c.162-.174.366-.356.582-.481.214-.124.367-.152.472-.144.08.006.296.043.638.385.519.519.572.956.462 1.424-.139.59-.577 1.298-1.26 2.05-.662.727-1.442 1.375-2.075 1.85l-.261.192-.261-.192c-.633-.475-1.413-1.123-2.075-1.85-.683-.752-1.121-1.46-1.26-2.05-.11-.468-.057-.905.462-1.424ZM10 7.66s.419-.607 1.084-1.053c.787-.528 1.919-.832 3.11.36C17.79 10.564 10 15.358 10 15.358s-7.79-4.794-4.195-8.39c1.192-1.192 2.324-.888 3.111-.36C9.581 7.054 10 7.66 10 7.66Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeartCircle20);
