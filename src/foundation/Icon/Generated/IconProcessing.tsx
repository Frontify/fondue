import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconProcessing(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconProcessing"
            {...props}
        >
            <path d="M5.414 15.775C6.524 17.956 9.137 19.7 12 19.7c3.796 0 7.15-3.065 7.15-6.15a.85.85 0 011.7 0c0 4.06-4.148 7.85-8.85 7.85-3.406 0-6.521-1.989-7.98-4.628l-.333 1.888a.85.85 0 11-1.674-.296l.695-3.939a.85.85 0 011.108-.658l3.92.691a.85.85 0 01-.296 1.674l-2.026-.357zM20.067 7.49l.364-2.065a.85.85 0 011.674.295l-.694 3.94a.85.85 0 01-1.109.658l-3.92-.691a.85.85 0 01.296-1.675l1.888.333C17.444 6.123 14.846 4.4 12 4.4c-3.796 0-7.15 3.065-7.15 6.15a.85.85 0 01-1.7 0C3.15 6.49 7.298 2.7 12 2.7c3.475 0 6.648 2.07 8.067 4.79z" />
        </svg>
    );
}

const MemoIconProcessing = React.memo(IconProcessing);
export default MemoIconProcessing;
