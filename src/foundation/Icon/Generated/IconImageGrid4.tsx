import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageGrid4(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconImageGrid4"
            {...props}
        >
            <path d="M4.472 11.231a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444zm5.185 1.481a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444zm5.186 1.481a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444zm5.185 1.481a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444z" />
        </svg>
    );
}

const MemoIconImageGrid4 = React.memo(IconImageGrid4);
export default MemoIconImageGrid4;
