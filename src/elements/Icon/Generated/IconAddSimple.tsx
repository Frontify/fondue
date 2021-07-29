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

function IconAddSimple(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M13.0653049,13.0653049 L13.0673353,17.8040227 C13.0674719,18.3922341 12.5907407,18.8706272 12.0025261,18.8725437 C11.4143116,18.8744601 10.9373588,18.3991741 10.9372221,17.8109627 L10.93519,13.06481 L6.18903728,13.0627779 C5.60082588,13.0626412 5.1255399,12.5856884 5.12745634,11.9974739 C5.12937277,11.4092593 5.6077659,10.9325281 6.1959773,10.9326647 L10.9346951,10.9346951 L10.9326647,6.1959773 C10.9325281,5.6077659 11.4092593,5.12937277 11.9974739,5.12745634 C12.5856884,5.1255399 13.0626412,5.60082588 13.0627779,6.18903728 L13.06481,10.93519 L17.8109627,10.9372221 C18.3991741,10.9373588 18.8744601,11.4143116 18.8725437,12.0025261 C18.8706272,12.5907407 18.3922341,13.0674719 17.8040227,13.0673353 L13.0653049,13.0653049 Z" />
        </svg>
    );
}

const MemoIconAddSimple = React.memo(IconAddSimple);
export default MemoIconAddSimple;
