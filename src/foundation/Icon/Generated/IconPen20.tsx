import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPen20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPen20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m16.89 5.89-1.769-1.769-1.283 1.283 1.77 1.77L16.89 5.89ZM4.946 14.296l7.832-7.831 1.769 1.769-7.832 7.832-2.268.499.5-2.269Zm2.52 3.14L17.95 6.951a1.5 1.5 0 0 0 0-2.121l-1.77-1.77a1.5 1.5 0 0 0-2.12 0L3.574 13.547l-.761 3.46a1 1 0 0 0 1.191 1.192l3.46-.762Zm5.284-.936a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPen20);
