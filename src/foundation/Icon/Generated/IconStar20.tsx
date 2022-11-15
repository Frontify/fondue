import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStar20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m10 1.16.685 1.534 1.96 4.39 4.452.581 1.551.203-1.13 1.082-3.361 3.222.842 4.695.29 1.621-1.413-.844L10 15.328l-3.876 2.316-1.414.844.29-1.62.843-4.696L2.481 8.95l-1.13-1.082 1.552-.203 4.453-.582 1.96-4.389L10 1.16Zm0 3.68L8.554 8.078l-.17.384-.417.054-3.319.434 2.523 2.418.29.278-.07.395-.623 3.47 2.847-1.7.385-.23.385.23 2.847 1.7-.622-3.47-.071-.395.29-.279 2.523-2.417-3.319-.434-.416-.054-.171-.384L10 4.84Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconStar20);
