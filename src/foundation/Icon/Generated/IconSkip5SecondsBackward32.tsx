import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconSkip5SecondsBackward32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconSkip5SecondsBackward32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M16.867 26.081h6A5.133 5.133 0 0 0 28 20.948v-5.333a5.133 5.133 0 0 0-5.133-5.134h-4.478l2.19-2.19a.955.955 0 0 0-.003-1.344.949.949 0 0 0-1.345-.002l-4.044 4.044a.946.946 0 0 0-.276.67.935.935 0 0 0 .276.673l4.044 4.045a.955.955 0 0 0 1.345-.002.949.949 0 0 0 .002-1.345l-2.282-2.282h4.57a2.867 2.867 0 0 1 2.867 2.867v5.333a2.867 2.867 0 0 1-2.866 2.867h-6a1.133 1.133 0 0 0 0 2.266ZM4.11 19.133c.28 1.437 1.79 2.42 3.609 2.42 2.259 0 3.857-1.54 3.857-3.696 0-2.01-1.35-3.417-3.3-3.417-1.026 0-1.716.396-2.053.836v-2.48h4.796v-1.73H4.463v5.999H6.09c.264-.587.88-.924 1.613-.924 1.115 0 1.878.763 1.878 1.877 0 1.042-.72 1.834-1.834 1.834-.836 0-1.57-.455-1.833-1.218l-1.804.499Z"
            />
        </svg>
    );
}

const Memo = memo(IconSkip5SecondsBackward32);
export default Memo;
