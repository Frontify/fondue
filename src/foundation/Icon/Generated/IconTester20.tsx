import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconTester20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTester20"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 7.5h2m-6 10h1.5m2.5-7h2m-2 3h2m2.5 4V8l6-2v8.5m-6 3h-7m7 0H18m-14.5 0V5l7-2v2m2 5.5h2m-2 3h2"
            />
        </svg>
    );
}

const Memo = memo(IconTester20);
export default Memo;
