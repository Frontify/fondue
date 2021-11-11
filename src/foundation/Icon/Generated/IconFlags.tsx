import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFlags(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFlags"
            {...props}
        >
            <path d="M6.75 3.75H19.5a.75.75 0 01.592 1.21L16.95 9l3.142 4.04a.75.75 0 01-.592 1.21H6.75v6.6a.75.75 0 01-1.5 0V3.15a.75.75 0 011.5 0v.6zm0 1.5v7.5h11.217l-2.559-3.29a.75.75 0 010-.92l2.559-3.29H6.75z" />
        </svg>
    );
}

const MemoIconFlags = React.memo(IconFlags);
export default MemoIconFlags;
