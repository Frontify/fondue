import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconEnvelope32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconEnvelope32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25 8H7c-.05 0-.101.002-.151.006l9.115 9.115 9.12-9.12A2.04 2.04 0 0 0 25 8ZM5 10c0-.297.065-.58.181-.833L12.015 16 5.18 22.833A1.993 1.993 0 0 1 5 22V10Zm1.849 13.994c.05.004.1.006.151.006h18c.028 0 .056 0 .084-.002L18.5 17.414l-1.828 1.829-.708.707-.707-.707-1.828-1.829-6.58 6.58ZM19.914 16l6.882 6.881c.13-.265.204-.565.204-.881V10c0-.316-.073-.616-.204-.882L19.914 16ZM7 6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconEnvelope32);
