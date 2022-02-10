import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEye16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconEye16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M10.667 8a2.667 2.667 0 1 1-5.226-.752c.081-.276.405-.368.653-.224.232.133.31.424.264.687a1.667 1.667 0 1 0 1.155-1.305c-.184.056-.387.059-.554-.038-.336-.194-.372-.663-.016-.817A2.667 2.667 0 0 1 10.667 8Z" />
                <path
                    fillRule="evenodd"
                    d="M15.15 7.515c.147.307.147.663 0 .97A7.917 7.917 0 0 1 8 13 7.917 7.917 0 0 1 .85 8.485a1.127 1.127 0 0 1 0-.97A7.917 7.917 0 0 1 8 3a7.917 7.917 0 0 1 7.15 4.515ZM2.015 8.55a1.096 1.096 0 0 1 0-1.1A6.914 6.914 0 0 1 8 4a6.914 6.914 0 0 1 5.987 3.45c.197.34.197.76 0 1.1A6.914 6.914 0 0 1 8 12a6.914 6.914 0 0 1-5.986-3.45Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconEye16);
export default Memo;
