import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconRocket20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconRocket20"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M15.691 8.721c-1.79 1.79-3.701 3.029-5.17 3.82-.619.333-1.155.585-1.564.762l-2.445-2.445c.177-.409.429-.945.763-1.565.79-1.468 2.028-3.379 3.819-5.17.724-.724 1.713-1.11 2.806-1.27 1.093-.16 2.18-.078 2.954.035.03.005.044.015.05.022.008.007.018.021.023.051.113.773.195 1.861.035 2.954-.16 1.093-.546 2.082-1.27 2.806Zm1.06 1.06a22.682 22.682 0 0 1-2.13 1.877l.002.043v2.88a.75.75 0 0 1-.344.63l-4.735 3.053c-.965.622-2.187-.276-1.882-1.383l.594-2.157-3.165-3.165-2.158.594c-1.106.305-2.004-.917-1.382-1.882l3.052-4.735a.75.75 0 0 1 .63-.343h2.924a22.689 22.689 0 0 1 1.876-2.13c2.054-2.054 5.33-1.91 7.039-1.659.7.103 1.236.639 1.339 1.34.251 1.708.395 4.984-1.66 7.038ZM9.824 14.56a24.034 24.034 0 0 0 3.3-1.829v1.441l-3.841 2.476.514-1.868a.75.75 0 0 0 .027-.22ZM5.255 9.992a.75.75 0 0 0-.22.027l-1.869.514 2.477-3.84h1.44a24.032 24.032 0 0 0-1.828 3.299Zm7.658-3.09a1.357 1.357 0 1 0 1.92-1.92 1.357 1.357 0 0 0-1.92 1.92Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h20v20H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket20);
export default Memo;
