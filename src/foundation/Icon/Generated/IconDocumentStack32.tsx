import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentStack32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDocumentStack32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.174 1.98a4.39 4.39 0 0 0-4.38 4.017 4.387 4.387 0 0 0-4.007 4.365v15.277a4.386 4.386 0 0 0 4.384 4.381h11.666a4.38 4.38 0 0 0 4.369-4.016 4.378 4.378 0 0 0 4.007-4.361v-11.36c0-.605-.354-1.424-.791-1.835l-6.08-5.723c-.443-.416-1.28-.745-1.88-.745h-7.288Zm12.047 22.19a2.189 2.189 0 0 0 2.134-2.184V12.15h-3.24l.315.297c.436.41.79 1.23.79 1.835v9.887Zm-3.072-13.868h5.206v-.213l-6.501-6.085v5.078l1.296 1.22Zm-3.153-2.968V3.83h-6.158c-1.212 0-2.187.96-2.201 2.15h5.832c.602 0 1.438.33 1.88.745l.647.609Zm-3.068 8.817h7.435v9.835a2.188 2.188 0 0 1-2.186 2.185H7.83a2.185 2.185 0 0 1-2.185-2.177V10.007c0-1.203.98-2.177 2.201-2.177h6.158v7.396c0 .515.414.925.924.925Zm7.435-2.063v.214h-6.502V8.004l6.502 6.085Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocumentStack32);
export default Memo;
