import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoDontsUnderline(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconDoDontsUnderline"
            {...props}
        >
            <path d="M7.26 12.722h1.242v1.428H4.589v-1.428H5.83V7.629H4.013v.931H2.584V6.2H10.506v2.36H9.078V7.63H7.26v5.093zm-4.35 5.115a.91.91 0 110-1.818h18.18a.91.91 0 010 1.818H2.91z" />
        </svg>
    );
}

const MemoIconDoDontsUnderline = React.memo(IconDoDontsUnderline);
export default MemoIconDoDontsUnderline;
