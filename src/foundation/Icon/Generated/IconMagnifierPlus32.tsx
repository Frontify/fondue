import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifierPlus32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMagnifierPlus32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.5 24a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Zm8.808-2.106c1.68-2 2.692-4.578 2.692-7.394C26 8.149 20.851 3 14.5 3S3 8.149 3 14.5 8.149 26 14.5 26c2.816 0 5.395-1.012 7.394-2.692l4.399 4.4a1 1 0 0 0 1.414-1.415l-4.399-4.399ZM13.5 15.5v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3v-3a1 1 0 1 0-2 0v3h-3a1 1 0 1 0 0 2h3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifierPlus32);
