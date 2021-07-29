import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconAlignLeft(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M1.98043478,3.88455184 C1.98043478,3.40683292 2.36975239,3.01956522 2.85,3.01956522 C3.33024761,3.01956522 3.71956522,3.40683292 3.71956522,3.88455184 L3.71956522,20.1545786 C3.71956522,20.6322975 3.33024761,21.0195652 2.85,21.0195652 C2.36975239,21.0195652 1.98043478,20.6322975 1.98043478,20.1545786 L1.98043478,3.88455184 Z M8.01956522,11.2044448 L21.15,11.2044448 C21.6717391,11.2044448 22.0195652,11.5504395 22.0195652,12.0694315 C22.0195652,12.5884234 21.6717391,12.9344181 21.15,12.9344181 L8.01956522,12.9344181 L12.6282609,17.5188472 C12.976087,17.8648419 12.976087,18.3838338 12.6282609,18.7298285 C12.2804348,19.0758231 11.7586957,19.0758231 11.4108696,18.7298285 L5.32391304,12.6749221 C4.97608696,12.3289275 4.97608696,11.8099355 5.32391304,11.4639408 L11.4108696,5.40903446 C11.7586957,5.06303981 12.2804348,5.06303981 12.6282609,5.40903446 C12.976087,5.75502911 12.976087,6.27402108 12.6282609,6.62001573 L8.01956522,11.2044448 Z" />
        </svg>
    );
}

const MemoIconAlignLeft = React.memo(IconAlignLeft);
export default MemoIconAlignLeft;
