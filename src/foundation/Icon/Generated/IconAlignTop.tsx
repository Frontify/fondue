import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAlignTop(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAlignTop"
            {...props}
        >
            <path d="M3.865 2h16.27c.478 0 .865.39.865.87s-.387.87-.865.87H3.865A.867.867 0 013 2.87c0-.48.387-.87.865-.87zm7.222 6l-4.609 4.609a.84.84 0 01-1.217 0 .84.84 0 010-1.218l6.087-6.087a.84.84 0 011.217 0l6.087 6.087a.84.84 0 010 1.218.84.84 0 01-1.217 0L12.826 8v13.13c0 .522-.348.87-.87.87-.521 0-.869-.348-.869-.87V8z" />
        </svg>
    );
}

const MemoIconAlignTop = React.memo(IconAlignTop);
export default MemoIconAlignTop;
