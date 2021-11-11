import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLock(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconLock"
            {...props}
        >
            <path d="M12.867 17a.833.833 0 01-1.667 0v-1.056a1.666 1.666 0 111.667 0V17zM7.033 8.667V7a5 5 0 1110 0v1.667h.834a2.5 2.5 0 012.5 2.5V19.5a2.5 2.5 0 01-2.5 2.5H6.2a2.5 2.5 0 01-2.5-2.5v-8.333a2.5 2.5 0 012.5-2.5h.833zm0 1.666H6.2a.833.833 0 00-.833.834V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833v-8.333a.833.833 0 00-.833-.834H7.033zM8.7 8.667h6.667V7A3.333 3.333 0 008.7 7v1.667z" />
        </svg>
    );
}

const MemoIconLock = React.memo(IconLock);
export default MemoIconLock;
