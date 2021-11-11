import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowRight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconArrowRight"
            {...props}
        >
            <path d="M18.498 13.03H3.026a1.026 1.026 0 110-2.05h15.472L13.07 5.55a1.026 1.026 0 111.45-1.45l7.18 7.18c.4.4.4 1.05 0 1.45l-7.18 7.18a1.026 1.026 0 01-1.45-1.45l5.428-5.43z" />
        </svg>
    );
}

const MemoIconArrowRight = React.memo(IconArrowRight);
export default MemoIconArrowRight;
