import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFaceHappy16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFaceHappy16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.402 14.146c.812.347 1.678.52 2.598.52.92 0 1.786-.173 2.598-.52a6.69 6.69 0 0 0 2.122-1.426 6.69 6.69 0 0 0 1.426-2.122c.347-.812.52-1.678.52-2.598 0-.92-.173-1.786-.52-2.597A6.691 6.691 0 0 0 12.72 3.28a6.69 6.69 0 0 0-2.122-1.426A6.535 6.535 0 0 0 8 1.334c-.92 0-1.786.173-2.598.52A6.69 6.69 0 0 0 3.28 3.28a6.69 6.69 0 0 0-1.426 2.123A6.534 6.534 0 0 0 1.334 8c0 .92.173 1.786.52 2.598A6.69 6.69 0 0 0 3.28 12.72a6.69 6.69 0 0 0 2.122 1.426Zm1.386-7.661a.91.91 0 1 1-1.818 0 .91.91 0 0 1 1.818 0Zm3.333.91a.91.91 0 1 0 0-1.82.91.91 0 0 0 0 1.82ZM4.7 8.972a.605.605 0 0 0-.271.813c.71 1.42 1.931 2.154 3.572 2.154 1.64 0 2.862-.733 3.572-2.154a.606.606 0 1 0-1.084-.542c-.502 1.004-1.3 1.483-2.488 1.483s-1.986-.479-2.488-1.483a.606.606 0 0 0-.813-.27Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceHappy16Filled);
export default Memo;
