import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconUploadAlternative(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconUploadAlternative"
            {...props}
        >
            <path d="M11.286 9.577v6.171c0 .394.32.711.714.711a.711.711 0 00.714-.71V9.566l1.818 1.817a.716.716 0 001.008-.001c.281-.281.28-.73.002-1.009l-3.034-3.033a.71.71 0 00-.501-.207.701.701 0 00-.506.207l-3.033 3.033a.716.716 0 00.001 1.009c.281.28.73.28 1.009.001l1.808-1.807zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-1.429A8.571 8.571 0 1012 3.43a8.571 8.571 0 000 17.142z" />
        </svg>
    );
}

const MemoIconUploadAlternative = React.memo(IconUploadAlternative);
export default MemoIconUploadAlternative;
