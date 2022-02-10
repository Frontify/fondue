import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFolder20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFolder20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.791 5.062h5.614c.527 0 .98.187 1.36.561.379.374.568.83.568 1.367v8.32c0 .537-.19.992-.568 1.367a1.868 1.868 0 0 1-1.36.561H3.595a1.86 1.86 0 0 1-1.367-.561 1.86 1.86 0 0 1-.562-1.368V6.897c0-.034.005-.065.015-.094a.657.657 0 0 1 0-.194 1.58 1.58 0 0 1 .043-.209l.835-2.677c.105-.335.321-.623.648-.863.326-.24.666-.36 1.021-.36h4.49c.356 0 .694.12 1.016.36.321.24.534.528.64.863l.417 1.339Zm-1.439 0L9.194 4.4a.832.832 0 0 0-.302-.44.782.782 0 0 0-.49-.18H4.545a.782.782 0 0 0-.49.18.832.832 0 0 0-.302.44l-.158.662h5.757Zm-6.405 9.614V7.624c0-.355.125-.657.375-.907s.551-.374.906-.374h11.543c.355 0 .657.125.907.374.25.25.374.552.374.907v7.052c0 .355-.125.657-.374.907-.25.25-.552.374-.907.374H4.228c-.355 0-.657-.125-.906-.374a1.235 1.235 0 0 1-.375-.907Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFolder20);
export default Memo;
