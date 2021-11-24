import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSingleQuoteDown(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 8 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconSingleQuoteDown"
            {...props}
        >
            <path d="M1.68 12V9.561h1.414c1.17 0 1.756-.585 1.756-1.756V6.244h-.683c-.943 0-1.723-.293-2.341-.878C1.176 4.78.85 4.049.85 3.17c0-.943.325-1.708.976-2.293C2.444.293 3.224 0 4.167 0 5.11 0 5.891.309 6.51.927c.618.618.927 1.398.927 2.341v4.537C7.436 10.602 6.037 12 3.24 12H1.68z" />
        </svg>
    );
}

const MemoIconSingleQuoteDown = React.memo(IconSingleQuoteDown);
export default MemoIconSingleQuoteDown;
