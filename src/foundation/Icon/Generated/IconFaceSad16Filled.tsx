import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconFaceSad16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFaceSad16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.403 14.146c.811.347 1.677.52 2.597.52.92 0 1.786-.173 2.598-.52a6.689 6.689 0 0 0 2.122-1.426 6.689 6.689 0 0 0 1.426-2.122c.347-.812.52-1.678.52-2.598 0-.92-.173-1.786-.52-2.597A6.69 6.69 0 0 0 12.72 3.28a6.69 6.69 0 0 0-2.122-1.426A6.534 6.534 0 0 0 8 1.334c-.92 0-1.786.173-2.597.52A6.69 6.69 0 0 0 3.28 3.28a6.69 6.69 0 0 0-1.426 2.123A6.534 6.534 0 0 0 1.334 8c0 .92.173 1.786.52 2.598A6.69 6.69 0 0 0 3.28 12.72a6.69 6.69 0 0 0 2.123 1.426Zm1.385-8.267a.91.91 0 1 1-1.818 0 .91.91 0 0 1 1.818 0Zm3.333.909a.91.91 0 1 0 0-1.818.91.91 0 0 0 0 1.818ZM4.7 11.269a.606.606 0 0 1-.271-.813C5.138 9.036 6.359 8.303 8 8.303c1.64 0 2.862.733 3.573 2.153a.606.606 0 0 1-1.085.542C9.986 9.994 9.188 9.515 8 9.515c-1.187 0-1.986.48-2.488 1.483a.605.605 0 0 1-.813.271Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceSad16Filled);
export default Memo;
