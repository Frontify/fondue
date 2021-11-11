import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconColorScale(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconColorScale"
            {...props}
        >
            <path d="M16.615 9.338H12v5.385h4.615V9.338zm1.539 0v5.385h2.308V9.338h-2.308zm-7.692 0H3.538v5.385h6.924V9.338zM3.538 7.8h16.924c.85 0 1.538.689 1.538 1.538v5.385c0 .85-.689 1.539-1.538 1.539H3.538c-.85 0-1.538-.69-1.538-1.539V9.338c0-.85.689-1.538 1.538-1.538z" />
        </svg>
    );
}

const MemoIconColorScale = React.memo(IconColorScale);
export default MemoIconColorScale;
