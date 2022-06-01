import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconPolygon12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPolygon12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m6 .881.298.223 4.532 3.375.28.208-.098.333-1.648 5.626-.106.359H2.741l-.105-.36L.988 5.02.89 4.687l.28-.208L5.7 1.104 6 .88ZM2.045 5.073l1.445 4.932h5.02l1.444-4.932L6 2.128 2.045 5.073Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPolygon12);
export default Memo;
