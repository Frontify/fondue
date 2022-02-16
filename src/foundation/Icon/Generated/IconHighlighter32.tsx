import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHighlighter32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHighlighter32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M23.971 4.738a2.667 2.667 0 0 0-3.61-.149L8.937 14.273a2.667 2.667 0 0 0-.772 1.097l-1.991 5.3a1.333 1.333 0 0 0 .287 1.393l-2.265 2.121-.116.126c-1.374 1.496-.313 3.913 1.718 3.913h2.011c.562 0 1.106-.204 1.53-.572l1.488-1.293c.337.188.746.223 1.118.083l5.3-1.99c.426-.16.803-.426 1.097-.773l9.684-11.426a2.667 2.667 0 0 0-.149-3.61l-3.905-3.904Zm2.49 5.319-3.904-3.905a.667.667 0 0 0-.902-.037l-10.974 9.3 6.517 6.518L26.5 10.959a.667.667 0 0 0-.037-.902ZM8.197 20.97l1.423-3.788 5.813 5.812-3.789 1.423-3.447-3.447Zm1.174 4.003-1.495-1.496-2.258 2.115-.065.07a.333.333 0 0 0 .245.56h2.011a.34.34 0 0 0 .219-.082l1.343-1.167Z"
                    clipRule="evenodd"
                />
                <path d="M17.466 25.955a1 1 0 1 0 0 2h6.796a1 1 0 1 0 0-2h-6.796Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconHighlighter32);
export default Memo;
