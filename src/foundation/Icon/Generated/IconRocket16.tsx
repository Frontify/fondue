import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconRocket16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconRocket16"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.6 7.398a18.088 18.088 0 0 1-5.572 3.76L4.881 9.012a18.089 18.089 0 0 1 3.76-5.572c1.198-1.197 3.189-1.246 4.572-1.072.249.03.429.21.46.46.174 1.383.125 3.374-1.072 4.571Zm.708.707a18.181 18.181 0 0 1-1.803 1.577v2.261a.5.5 0 0 1-.23.42l-3.565 2.3c-.772.498-1.75-.22-1.506-1.106l.39-1.418-2.693-2.694-1.418.391c-.886.244-1.604-.734-1.106-1.506l2.299-3.566a.5.5 0 0 1 .42-.23h2.262c.457-.596.98-1.206 1.576-1.802 1.557-1.556 3.99-1.535 5.403-1.358.703.089 1.24.626 1.328 1.328.178 1.414.2 3.847-1.357 5.403Zm-5.642 3.867a19.174 19.174 0 0 0 2.839-1.574v1.273l-3.337 2.152.48-1.747a.503.503 0 0 0 .018-.104ZM4.068 8.374c.304-.684.814-1.703 1.574-2.84H4.369L2.217 8.873l1.746-.481a.502.502 0 0 1 .105-.017Zm6.17-2.572a1.086 1.086 0 1 0 1.534-1.535 1.086 1.086 0 0 0-1.535 1.535Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket16);
export default Memo;
