import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoubleChevronRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            style={style}
            name="IconDoubleChevronRight"
            {...props}
        >
            <path d="M7.799 12V9.727l5.841-3.568V5.84L7.799 2.247V0h.158l7.612 4.784v2.432L7.957 12H7.8zM.715 9.727l5.868-3.568V5.84L.715 2.247V0h.158l7.64 4.784v2.432L.872 12H.715V9.727z" />
        </svg>
    );
}

const MemoIconDoubleChevronRight = React.memo(IconDoubleChevronRight);
export default MemoIconDoubleChevronRight;
