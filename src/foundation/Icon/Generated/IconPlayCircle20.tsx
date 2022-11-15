import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayCircle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlayCircle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm1.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8.25 7.548a.25.25 0 0 1 .382-.212l4.073 2.53a.25.25 0 0 1-.004.428l-4.073 2.415a.25.25 0 0 1-.378-.215V7.548Zm1.173-1.486c-1.165-.724-2.673.114-2.673 1.486v4.946c0 1.357 1.476 2.197 2.643 1.505l4.073-2.415a1.75 1.75 0 0 0 .03-2.992l-4.073-2.53Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayCircle20);
