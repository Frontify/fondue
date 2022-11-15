import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrop12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCrop12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 1a.5.5 0 0 1 .5.5V3h3.5c.232 0 .451.053.647.146L9.63 1.665a.532.532 0 0 1 .725-.019.47.47 0 0 1 .017.69L8.854 3.852c.093.196.146.415.146.647V8h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V9H4.5A1.5 1.5 0 0 1 3 7.5V4H1.5a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .5-.5Zm3.794 3H4v3.294l.039-.039 1.183-1.183L7.294 4ZM4.706 8l.075-.075 1.183-1.183L8 4.706V8H4.706Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrop12);
