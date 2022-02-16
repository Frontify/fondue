import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlayFrame20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlayFrame20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.436 9.262v4.39c.033.513.277.926.702 1.127.182.089.37.128.568.128.267 0 .536-.084.75-.262l3.211-2.19c.339-.237.538-.627.538-1.03 0-.417-.212-.813-.571-1.041l-3.25-2.157c-.38-.253-.84-.27-1.253-.08-.445.256-.695.659-.695 1.115Zm4.457 2.169L8.718 9.324l-.002 4.277 3.177-2.17Z" />
                <path d="M3.59 2.25h12.82c1.062 0 1.923.861 1.923 1.923v11.538a1.923 1.923 0 0 1-1.923 1.924H3.59a1.923 1.923 0 0 1-1.923-1.924V4.173c0-1.062.86-1.923 1.923-1.923Zm-.641 4.487v8.974c0 .355.287.642.64.642H16.41a.641.641 0 0 0 .641-.642V6.737H2.95ZM17.05 5.455H2.95V4.173a.64.64 0 0 1 .64-.641h12.82c.354 0 .641.287.641.641v1.282Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlayFrame20);
export default Memo;
