import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSingleChevronRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const { size } = props;
    const style =
        typeof size === "string"
            ? {
                  width: size,
                  height: size,
              }
            : {
                  width: IconSizeMap[size || IconSize.Size16],
                  height: IconSizeMap[size || IconSize.Size16],
              };
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 10 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconSingleChevronRight"
            {...props}
        >
            <path d="M.78 0l8.886 4.736v2.501L.779 12H.62V9.765l6.972-3.619v-.319L.619 2.208V0h.16z" />
        </svg>
    );
}

const MemoIconSingleChevronRight = React.memo(IconSingleChevronRight);
export default MemoIconSingleChevronRight;
