import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMagnifier32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMagnifier32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24 14.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Zm-2.106 8.808c-2 1.68-4.578 2.692-7.394 2.692C8.149 26 3 20.851 3 14.5S8.149 3 14.5 3 26 8.149 26 14.5c0 2.816-1.012 5.395-2.692 7.394l4.4 4.399a1 1 0 0 1-1.415 1.414l-4.399-4.399Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMagnifier32);
