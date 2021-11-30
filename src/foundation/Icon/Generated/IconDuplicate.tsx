import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDuplicate(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconDuplicate"
            {...props}
        >
            <path d="M9.26 14.74H7.697a.783.783 0 1 1 0-1.566H9.26v-1.565a.783.783 0 1 1 1.565 0v1.565h1.565a.783.783 0 0 1 0 1.565h-1.565v1.565a.783.783 0 0 1-1.565 0V14.74Zm-.69-7.827h6.031a2.486 2.486 0 0 1 2.486 2.486v6.03h1.427a.829.829 0 0 0 .829-.828V5.486a.829.829 0 0 0-.829-.829H9.4a.829.829 0 0 0-.829.829v1.427Zm8.517 10.174v1.427A2.486 2.486 0 0 1 14.601 21H5.486A2.486 2.486 0 0 1 3 18.514V9.4a2.486 2.486 0 0 1 2.486-2.486h1.427V5.486A2.486 2.486 0 0 1 9.399 3h9.115A2.486 2.486 0 0 1 21 5.486V14.6a2.486 2.486 0 0 1-2.486 2.486h-1.427ZM5.408 8.478a.843.843 0 0 0-.843.843v9.271c0 .465.378.843.843.843h9.27a.843.843 0 0 0 .844-.843v-9.27a.843.843 0 0 0-.843-.844H5.408Z" />
        </svg>
    );
}

const Memo = memo(IconDuplicate);
export default Memo;
