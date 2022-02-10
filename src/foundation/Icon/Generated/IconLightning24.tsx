import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLightning24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.293 10.055c-.24-.596-.685-.895-1.333-.895h-3.97l1.985-5.194c.273-.714.091-1.278-.544-1.693-.636-.415-1.226-.357-1.771.175L4.445 12.41c-.453.44-.56.956-.32 1.546.24.59.677.886 1.313.886h3.6l-2.102 5.156c-.272.713-.097 1.284.525 1.712.623.428 1.213.382 1.77-.136l10.702-9.962c.48-.441.6-.96.36-1.557Zm-9.155 3.366h-5.7L15.652 3.46l-2.743 7.12h6.05l-10.7 9.962 2.88-7.12Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLightning24);
export default Memo;
