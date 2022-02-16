import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPen24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPen24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M13.569 19.466a.75.75 0 1 0 0 1.5h5.097a.75.75 0 0 0 0-1.5h-5.097Z" />
                <path
                    fillRule="evenodd"
                    d="M15.586 3.266a1.75 1.75 0 0 1 2.475 0l2.618 2.618a1.75 1.75 0 0 1 0 2.475L8.082 20.956H2.99v-5.093L15.586 3.266ZM17 4.326a.25.25 0 0 0-.353 0L4.489 16.485v2.972h2.972L19.618 7.298a.25.25 0 0 0 0-.353L17 4.327Z"
                    clipRule="evenodd"
                />
                <path d="M4.004 18h2v2h-2v-2Z" />
                <path
                    fillRule="evenodd"
                    d="m17.191 10.408-3.615-3.615 1.061-1.06 3.615 3.615-1.06 1.06Zm-5.901 9.808a.75.75 0 0 1 .75-.75h6.626a.75.75 0 1 1 0 1.5h-6.627a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPen24);
export default Memo;
