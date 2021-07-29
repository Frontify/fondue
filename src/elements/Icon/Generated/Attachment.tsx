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

function IconAttachment(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M3.5,5.5 L3.5,13.75 C3.5,15.1307119 4.61928813,16.25 6,16.25 C7.38071187,16.25 8.5,15.1307119 8.5,13.75 L8.5,4.5 C8.5,2.15278981 6.59721019,0.25 4.25,0.25 C1.90278981,0.25 0,2.15278981 0,4.5 L0,13.75 C0,17.0637085 2.6862915,19.75 6,19.75 C9.3137085,19.75 12,17.0637085 12,13.75 L12,5.5 C12,5.08578644 11.6642136,4.75 11.25,4.75 C10.8357864,4.75 10.5,5.08578644 10.5,5.5 L10.5,13.75 C10.5,16.2352814 8.48528137,18.25 6,18.25 C3.51471863,18.25 1.5,16.2352814 1.5,13.75 L1.5,4.5 C1.5,2.98121694 2.73121694,1.75 4.25,1.75 C5.76878306,1.75 7,2.98121694 7,4.5 L7,13.75 C7,14.3022847 6.55228475,14.75 6,14.75 C5.44771525,14.75 5,14.3022847 5,13.75 L5,5.5 C5,5.08578644 4.66421356,4.75 4.25,4.75 C3.83578644,4.75 3.5,5.08578644 3.5,5.5 Z" />
        </svg>
    );
}

const MemoIconAttachment = React.memo(IconAttachment);
export default MemoIconAttachment;
