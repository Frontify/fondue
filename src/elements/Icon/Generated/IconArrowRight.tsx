import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconArrowRight(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconArrowRight"
            {...props}
        >
            <path d="M18.498 13.03H3.026a1.026 1.026 0 110-2.05h15.472L13.07 5.55a1.026 1.026 0 111.45-1.45l7.18 7.18c.4.4.4 1.05 0 1.45l-7.18 7.18a1.026 1.026 0 01-1.45-1.45l5.428-5.43z" />
        </svg>
    );
}

const MemoIconArrowRight = React.memo(IconArrowRight);
export default MemoIconArrowRight;
