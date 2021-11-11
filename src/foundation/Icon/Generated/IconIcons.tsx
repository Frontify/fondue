import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconIcons(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconIcons"
            {...props}
        >
            <path d="M5.793 4.636L8.57 7.413A5.702 5.702 0 0112 6.273c1.286 0 2.474.424 3.43 1.14l2.777-2.777H5.793zM4.636 5.793v12.414l2.777-2.777A5.702 5.702 0 016.273 12c0-1.286.424-2.474 1.14-3.43L4.636 5.793zm14.728 12.414V5.793L16.587 8.57a5.702 5.702 0 011.14 3.43 5.702 5.702 0 01-1.14 3.43l2.777 2.777zm-1.157 1.157l-2.777-2.777a5.702 5.702 0 01-3.43 1.14 5.702 5.702 0 01-3.43-1.14l-2.777 2.777h12.414zm-3.951-3.95L12 13.156l-2.256 2.256a4.072 4.072 0 002.256.678c.834 0 1.61-.25 2.256-.678zm1.157-1.158A4.072 4.072 0 0016.091 12c0-.834-.25-1.61-.678-2.256L13.157 12l2.256 2.256zM8.587 9.744A4.072 4.072 0 007.909 12c0 .834.25 1.61.678 2.256L10.843 12 8.587 9.744zm1.157-1.157L12 10.843l2.256-2.256A4.072 4.072 0 0012 7.909c-.834 0-1.61.25-2.256.678zM5.454 3h13.091A2.455 2.455 0 0121 5.455v13.09A2.455 2.455 0 0118.545 21H5.455A2.455 2.455 0 013 18.545V5.455A2.455 2.455 0 015.455 3z" />
        </svg>
    );
}

const MemoIconIcons = React.memo(IconIcons);
export default MemoIconIcons;
