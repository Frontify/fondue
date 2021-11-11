import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientation(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconOrientation"
            {...props}
        >
            <path d="M5.333 18.667A3.333 3.333 0 012 15.333v-10A3.333 3.333 0 015.333 2h5.834A3.333 3.333 0 0114.5 5.333V9.5h4.167A3.333 3.333 0 0122 12.833v5.834A3.333 3.333 0 0118.667 22h-10a3.333 3.333 0 01-3.334-3.333zm1.667 0c0 .92.746 1.666 1.667 1.666h10c.92 0 1.666-.746 1.666-1.666v-5.834c0-.92-.746-1.666-1.666-1.666H14.5v4.166a3.333 3.333 0 01-3.333 3.334H7zm-1.667-15c-.92 0-1.666.746-1.666 1.666v10c0 .92.746 1.667 1.666 1.667h5.834c.92 0 1.666-.746 1.666-1.667v-10c0-.92-.746-1.666-1.666-1.666H5.333z" />
        </svg>
    );
}

const MemoIconOrientation = React.memo(IconOrientation);
export default MemoIconOrientation;
