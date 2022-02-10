import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListNumbers20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconListNumbers20"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M17.5 4.792c0 .345-.28.625-.625.625H9.18a.625.625 0 1 1 0-1.25h7.694c.345 0 .625.28.625.625ZM8.556 15.208c0-.345.28-.625.625-.625h6.054a.625.625 0 1 1 0 1.25H9.18a.625.625 0 0 1-.625-.625Zm7.304-6.964c0 .345-.28.625-.625.625H9.18a.625.625 0 0 1 0-1.25h6.054c.345 0 .625.28.625.625Zm1.64 3.467c0 .345-.28.625-.625.625H9.18a.625.625 0 1 1 0-1.25h7.694c.345 0 .625.28.625.625Zm-13.042.775h-1.09v-.072c0-.753.49-1.58 1.625-1.58.997 0 1.64.608 1.64 1.407 0 .663-.363 1.07-.694 1.443l-.105.12-.834.964v.054h1.632v1.011H3.435v-.792l1.575-1.767c.23-.256.483-.54.483-.903 0-.296-.22-.54-.522-.54-.322 0-.516.27-.516.572l.001.05a.67.67 0 0 1 .002.033Z"
                    clipRule="evenodd"
                />
                <path d="M4.529 9.167h1.137v-5H4.53l-1.03.82v1.14l.975-.777h.055v3.817Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconListNumbers20);
export default Memo;
