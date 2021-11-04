import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAnimalsNature(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconAnimalsNature"
            {...props}
        >
            <path d="M10.05 15.473L8.843 16.69a4.85 4.85 0 002.777.869h.017c2.866.065 4.912-1.984 6.082-5.45.853-2.531 1.028-5.77.72-6.082-.307-.312-3.54-.148-6.102.696-3.489 1.15-5.59 3.167-5.59 5.963 0 1.118.376 2.148 1.01 2.97l1.192-1.204.002-.024.394-3.474a.75.75 0 011.49.17l-.182 1.607 2.708-2.733a.75.75 0 111.065 1.056l-2.654 2.68 1.63-.215a.75.75 0 01.195 1.488l-3.549.466zM6.693 16.73a6.346 6.346 0 01-1.446-4.043c0-3.576 2.585-6.057 6.62-7.388 3.086-1.017 6.774-1.203 7.64-.325.86.872.66 4.569-.367 7.615-1.355 4.016-3.883 6.55-7.529 6.47a6.344 6.344 0 01-3.836-1.29l-1.743 1.76a.75.75 0 11-1.066-1.056l1.727-1.743z" />
        </svg>
    );
}

const MemoIconAnimalsNature = React.memo(IconAnimalsNature);
export default MemoIconAnimalsNature;
