import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconArrowUp"
            {...props}
        >
            <path d="M10.98 6.002L5.55 11.43A1.026 1.026 0 114.1 9.98l7.18-7.18c.4-.4 1.05-.4 1.45 0l7.18 7.18a1.026 1.026 0 01-1.45 1.45l-5.43-5.428v15.472a1.026 1.026 0 11-2.05 0V6.002z" />
        </svg>
    );
}

const MemoIconArrowUp = React.memo(IconArrowUp);
export default MemoIconArrowUp;
