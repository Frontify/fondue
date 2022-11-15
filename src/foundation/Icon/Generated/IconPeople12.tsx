import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPeople12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPeople12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 4.783c.847 0 1.475-.655 1.475-1.392C5.475 2.655 4.847 2 4 2c-.847 0-1.475.655-1.475 1.391 0 .737.628 1.392 1.475 1.392ZM6.475 3.39a2.36 2.36 0 0 1-.973 1.9A4.001 4.001 0 0 1 8 9v1h2.4v-.8A2.6 2.6 0 0 0 8 6.608V5.289c.606-.09 1.028-.59 1.028-1.137C9.028 3.548 8.51 3 7.8 3c-.104 0-.205.012-.3.034V2.019c.098-.012.198-.019.3-.019 1.23 0 2.228.964 2.228 2.152 0 .697-.343 1.317-.876 1.71A3.601 3.601 0 0 1 11.4 9.2V11H0V9a4.001 4.001 0 0 1 2.498-3.708 2.36 2.36 0 0 1-.973-1.9C1.525 2.07 2.633 1 4 1s2.475 1.07 2.475 2.391ZM4.2 10H7V9a3 3 0 0 0-6 0v1h3.2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPeople12);
