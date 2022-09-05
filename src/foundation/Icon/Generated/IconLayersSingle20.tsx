import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconLayersSingle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLayersSingle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m16.86 10-6.595-4.056a.507.507 0 0 0-.53 0L3.14 10l6.595 4.056c.162.1.368.1.53 0L16.86 10Zm-5.8-5.324c-.65-.4-1.471-.4-2.12 0L1.383 9.324a.792.792 0 0 0 0 1.352l7.557 4.648c.649.4 1.47.4 2.12 0l7.557-4.648a.792.792 0 0 0 0-1.352L11.06 4.676Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default memo(IconLayersSingle20);
