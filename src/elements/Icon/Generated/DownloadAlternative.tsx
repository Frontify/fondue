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

function IconDownloadAlternative(props: IconProps): React.ReactElement<IconProps> {
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
            <path
                d="M11.2857142,14.016577 L11.2857142,7.84498206 C11.2857142,7.45159597 11.6055109,7.13385527 12,7.13385527 C12.3972394,7.13385527 12.7142857,7.45223758 12.7142857,7.84498206 L12.7142857,14.0263693 L14.5317775,12.2088776 C14.8065359,11.9341192 15.2614842,11.9314317 15.5404301,12.2103776 C15.8213207,12.4912682 15.8200476,12.9409126 15.5419301,13.2190301 L12.5084724,16.2524878 C12.3713392,16.3896209 12.1893199,16.4589797 12.0066995,16.4593754 C11.8216715,16.4611452 11.6401311,16.3912989 11.5013199,16.2524878 L8.46786225,13.2190301 C8.19310388,12.9442717 8.19041633,12.4893235 8.46936226,12.2103776 C8.75025294,11.9294868 9.19989731,11.9307601 9.4780148,12.2088776 L11.2857142,14.016577 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20.5714286 C16.7338692,20.5714286 20.5714286,16.7338692 20.5714286,12 C20.5714286,7.26613072 16.7338692,3.42857142 12,3.42857142 C7.26613072,3.42857142 3.42857142,7.26613072 3.42857142,12 C3.42857142,16.7338692 7.26613072,20.5714286 12,20.5714286 Z"
                id="Icon_DownloadAlternative"
            />
        </svg>
    );
}

const MemoIconDownloadAlternative = React.memo(IconDownloadAlternative);
export default MemoIconDownloadAlternative;
