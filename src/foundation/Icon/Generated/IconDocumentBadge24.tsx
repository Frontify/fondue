import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentBadge24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDocumentBadge24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.343 5.645C4.343 3.632 5.995 2 8.033 2h6.119c.505 0 1.207.273 1.579.62l5.105 4.76c.367.343.664 1.024.664 1.528v9.45C21.5 20.37 19.855 22 17.82 22H8.023c-2.033 0-3.68-1.637-3.68-3.645v-.147A2.731 2.731 0 0 1 2.5 15.636c0-1.187.77-2.197 1.843-2.572V5.645Zm1.56 13.006v-.287h6.735c1.527 0 2.765-1.221 2.765-2.728 0-1.506-1.238-2.727-2.765-2.727H5.903V5.35c0-1 .823-1.81 1.848-1.81h5.17v6.153c0 .428.348.77.777.77h6.242v8.182a1.83 1.83 0 0 1-1.835 1.818H7.738c-1.013 0-1.835-.817-1.835-1.811ZM19.94 8.746v.177h-5.459v-5.24l5.46 5.063Zm-15.597 6.89c0-.502.413-.909.922-.909h7.373c.509 0 .922.407.922.91a.916.916 0 0 1-.922.909H5.265a.915.915 0 0 1-.922-.91Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocumentBadge24);
export default Memo;
