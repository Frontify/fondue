import React from "react";
import { IconProps } from "src/foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "src/foundation/Icon/IconSize";

function IconColorScaleSmall(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconColorScaleSmall"
            {...props}
        >
            <path d="M4.344 11.167a.82.82 0 00-.806.833c0 .46.361.833.806.833h15.312a.82.82 0 00.806-.833.82.82 0 00-.806-.833H4.344zM4.4 9.5h15.2c1.325 0 2.4 1.12 2.4 2.5s-1.075 2.5-2.4 2.5H4.4C3.075 14.5 2 13.38 2 12s1.075-2.5 2.4-2.5z" />
        </svg>
    );
}

const MemoIconColorScaleSmall = React.memo(IconColorScaleSmall);
export default MemoIconColorScaleSmall;
