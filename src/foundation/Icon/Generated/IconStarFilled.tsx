import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStarFilled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconStarFilled"
            {...props}
        >
            <path d="M5.82 21.021L7 14.14 2 9.265l6.91-1.004L12 2l3.09 6.261L22 9.265l-5 4.874 1.18 6.882-6.18-3.25z" />
        </svg>
    );
}

const MemoIconStarFilled = React.memo(IconStarFilled);
export default MemoIconStarFilled;
