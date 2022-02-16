import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSpeaker16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconSpeaker16"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M9.333 2.818a.667.667 0 0 0-1.11-.498l-3.39 3.013h-1.5C2.597 5.333 2 5.93 2 6.667v2.666c0 .737.597 1.334 1.333 1.334h1.5l3.39 3.013a.667.667 0 0 0 1.11-.498V2.818Zm-6 3.515h1.88l3.12-2.773v8.88l-3.12-2.774h-1.88A.333.333 0 0 1 3 9.334V6.667c0-.185.15-.334.333-.334Z"
                    clipRule="evenodd"
                />
                <path d="M11.025 4.394C12.24 5.342 12.833 6.53 12.833 8c0 1.469-.594 2.657-1.808 3.606a.5.5 0 1 0 .616.788C13.094 11.258 13.833 9.78 13.833 8c0-1.78-.739-3.258-2.192-4.394a.5.5 0 1 0-.616.788Z" />
                <path d="M10.833 8c0-.686-.184-1.24-.55-1.68a.5.5 0 0 1 .768-.64c.522.628.782 1.409.782 2.32 0 .911-.26 1.692-.782 2.32a.5.5 0 0 1-.769-.64c.367-.44.551-.994.551-1.68Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconSpeaker16);
export default Memo;
