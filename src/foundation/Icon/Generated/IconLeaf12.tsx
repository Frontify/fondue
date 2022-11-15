import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLeaf12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLeaf12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4 7.293 2.908 8.385a3.894 3.894 0 0 1 .331-5.13c.33-.329.898-.656 1.668-.936a12.865 12.865 0 0 1 2.472-.6c.852-.125 1.651-.168 2.262-.139.307.015.54.046.696.083.037.157.068.39.083.696.029.61-.014 1.41-.139 2.262-.124.85-.326 1.718-.6 2.471-.28.77-.607 1.34-.936 1.669a3.894 3.894 0 0 1-5.13.331L4.707 8h2.671a.5.5 0 0 0 0-1H5.707l2.035-2.035a.5.5 0 0 0-.707-.707L5 6.293V4.91a.5.5 0 0 0-1 0v2.383ZM2.532 2.548a4.894 4.894 0 0 0-.336 6.549L.964 10.328a.5.5 0 1 0 .708.708l1.231-1.232a4.894 4.894 0 0 0 6.549-.336c1.91-1.91 2.397-7.78 1.628-8.548-.769-.77-6.637-.283-8.548 1.628Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconLeaf12);
