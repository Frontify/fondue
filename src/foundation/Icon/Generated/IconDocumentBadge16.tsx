import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentBadge16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDocumentBadge16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.895 3.764c0-1.343 1.102-2.43 2.46-2.43h4.08c.336 0 .804.182 1.052.412L13.89 4.92c.245.229.443.683.443 1.019v6.3c0 1.34-1.097 2.428-2.454 2.428H5.35c-1.355 0-2.454-1.091-2.454-2.43v-.098a1.82 1.82 0 0 1-1.228-1.715A1.82 1.82 0 0 1 2.894 8.71V3.764Zm1.04 8.67v-.191h4.49a1.83 1.83 0 0 0 1.843-1.819c0-1.004-.825-1.818-1.843-1.818h-4.49v-5.04c0-.666.549-1.207 1.232-1.207h3.447v4.103c0 .285.232.513.518.513h4.161v5.454c0 .67-.55 1.212-1.223 1.212H5.159a1.218 1.218 0 0 1-1.224-1.207Zm9.358-6.603v.118H9.654V2.456l3.64 3.375ZM2.895 10.424a.61.61 0 0 1 .615-.606h4.915a.61.61 0 0 1 .615.606.61.61 0 0 1-.615.607H3.51a.61.61 0 0 1-.615-.607Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocumentBadge16);
export default Memo;
