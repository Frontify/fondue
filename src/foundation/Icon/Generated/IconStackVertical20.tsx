import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStackVertical20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStackVertical20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.292 11.125c0 .53-.43.958-.959.958H3.668a.958.958 0 0 1-.958-.958v-2.25c0-.53.429-.958.958-.958h12.666c.53 0 .959.429.959.958v2.25Zm-1.25-.292V9.167H3.958v1.666h12.084Zm1.25-5.116c0 .529-.43.958-.959.958H3.668a.958.958 0 0 1-.958-.958v-2.25c0-.53.429-.959.958-.959h12.666c.53 0 .959.43.959.959v2.25Zm-1.25-.292V3.758H3.958v1.667h12.084Zm1.25 11.109c0 .529-.43.958-.959.958H3.668a.958.958 0 0 1-.958-.958v-2.25c0-.53.429-.959.958-.959h12.666c.53 0 .959.43.959.959v2.25Zm-1.25-.292v-1.667H3.958v1.667h12.084Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackVertical20);
export default Memo;
