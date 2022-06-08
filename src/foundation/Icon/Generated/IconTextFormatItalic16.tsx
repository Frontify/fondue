import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconTextFormatItalic16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextFormatItalic16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 2.5a.5.5 0 0 1 .5-.5h4.033a.5.5 0 0 1 0 1H9.882L7.154 13H8.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1h1.618L8.846 3H7.5a.5.5 0 0 1-.5-.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatItalic16);
export default Memo;
