import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMusicNote20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMusicNote20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.917 6.214v8.26a.687.687 0 0 1-.009.11c.006.078.009.156.009.235 0 1.71-1.4 3.098-3.125 3.098-1.726 0-3.125-1.387-3.125-3.098 0-1.711 1.4-3.098 3.125-3.098.642 0 1.24.192 1.736.522V2.772c0-.38.311-.689.695-.689h10.416c.384 0 .695.308.695.689v11.703a.688.688 0 0 1-.01.11c.007.077.01.155.01.234 0 1.71-1.4 3.098-3.125 3.098-1.726 0-3.125-1.387-3.125-3.098 0-1.711 1.399-3.098 3.125-3.098.642 0 1.24.192 1.736.522v-6.03H7.917Zm0-1.377h9.028V3.46H7.917v1.377Zm-1.389 9.982c0 .95-.777 1.72-1.736 1.72s-1.736-.77-1.736-1.72.777-1.721 1.736-1.721 1.736.77 1.736 1.72Zm10.417 0c0 .95-.777 1.72-1.736 1.72-.96 0-1.736-.77-1.736-1.72s.777-1.721 1.736-1.721 1.736.77 1.736 1.72Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMusicNote20);
export default Memo;
