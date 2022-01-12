import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconUploadDontImages(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconUploadDontImages"
            {...props}
        >
            <path d="M20.34 5.348H3.66a.299.299 0 0 0-.22.091.293.293 0 0 0-.109.237V18.34c0 .085.037.164.11.237.06.06.133.09.218.09h16.682c.085 0 .164-.03.237-.09a.363.363 0 0 0 .09-.237V5.676a.32.32 0 0 0-.09-.237.363.363 0 0 0-.237-.09Zm1.66.328v12.666c0 .45-.164.838-.492 1.166A1.593 1.593 0 0 1 20.34 20H3.659c-.45 0-.838-.164-1.167-.492A1.592 1.592 0 0 1 2 18.342V5.676c0-.461.164-.856.492-1.184A1.595 1.595 0 0 1 3.66 4h16.682c.45 0 .838.164 1.167.492.328.328.492.723.492 1.184Zm-10.024 5.582.65-.65a.656.656 0 1 1 .927.928l-.65.65.65.65a.656.656 0 1 1-.928.928l-.65-.65-.65.65a.656.656 0 1 1-.928-.928l.65-.65-.65-.65a.656.656 0 1 1 .929-.928l.65.65Zm-.13 5.721a4.923 4.923 0 1 1 0-9.846 4.923 4.923 0 0 1 0 9.846Zm0-1.312a3.61 3.61 0 1 0 0-7.221 3.61 3.61 0 0 0 0 7.22Z" />
        </svg>
    );
}

const Memo = memo(IconUploadDontImages);
export default Memo;
