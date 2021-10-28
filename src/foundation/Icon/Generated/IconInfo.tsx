import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconInfo(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconInfo"
            {...props}
        >
            <path d="M14.127 2c.472 0 .821.156 1.048.467.227.312.283.733.17 1.261a2.13 2.13 0 01-.652 1.204c-.34.312-.746.467-1.218.467-.453 0-.789-.155-1.005-.467-.217-.312-.28-.712-.185-1.204.114-.528.34-.949.68-1.26A1.67 1.67 0 0114.127 2zm-3.655 11.841c.209-.718.355-1.279.44-1.685.085-.407.089-.713.014-.92-.075-.21-.241-.34-.496-.397-.255-.057-.619-.085-1.09-.085a2.386 2.386 0 01.176-1.092l-.007.015c.227-.018.492-.07.793-.156.708-.2 1.306-.422 1.88-.685l-.08.034c.273-.124.495-.241.665-.354.585.245.94.655 1.062 1.232.124.576.025 1.449-.297 2.62l-1.558 5.468c-.132.453-.227.825-.283 1.119-.057.293-.075.514-.057.665.018.152.07.255.156.312a.577.577 0 00.325.085c.189 0 .411-.067.666-.198.255-.132.524-.34.808-.624.283.189.453.492.51.907-.549.605-1.091 1.072-1.63 1.402-.538.33-1.072.496-1.6.496-.945 0-1.525-.373-1.742-1.119-.217-.746-.156-1.732.184-2.96l1.161-4.08z" />
        </svg>
    );
}

const MemoIconInfo = React.memo(IconInfo);
export default MemoIconInfo;
