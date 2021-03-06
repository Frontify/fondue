import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconAppearance(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconAppearance"
            {...props}
        >
            <path d="m10.13 19.353.552.552c.15.15.33.225.542.225a.738.738 0 0 0 .541-.225l4.392-4.395-7.66-7.664-4.393 4.394a.738.738 0 0 0-.225.542c0 .21.075.391.225.541l.552.552L6.29 12.22a.807.807 0 0 1 .562-.225c.211 0 .391.075.541.225.15.163.225.35.225.562a.738.738 0 0 1-.225.541L5.74 14.98l1.103 1.083.551-.531a.708.708 0 0 1 .542-.246c.21 0 .398.075.561.225a.75.75 0 0 1 .225.552.72.72 0 0 1-.245.552l-.531.552 1.083 1.083 2.757-2.739c.15-.15.33-.225.542-.225.211 0 .391.075.541.225a.75.75 0 0 1 .225.552.75.75 0 0 1-.225.552l-2.737 2.739Zm4.393-14.246 2.186-2.187c.6-.613 1.328-.92 2.186-.92.858 0 1.586.307 2.186.92.613.6.919 1.328.919 2.187 0 .858-.306 1.587-.92 2.187L18.896 9.48l1.655 1.655c.449.45.674.995.674 1.635s-.232 1.193-.695 1.656l-2.186 2.187a.738.738 0 0 1-.541.225.738.738 0 0 1-.542-.225l-4.943 4.926c-.3.3-.664.453-1.093.46a1.422 1.422 0 0 1-1.093-.46l-7.682-7.665c-.3-.3-.449-.664-.449-1.093 0-.43.157-.8.47-1.114l4.923-4.926A.738.738 0 0 1 7.17 6.2c0-.21.074-.391.224-.541L9.58 3.45c.45-.45.998-.674 1.645-.674s1.195.225 1.644.674l1.655 1.656Zm-3.84-.552L9.027 6.19l8.764 8.789 1.654-1.656c.15-.15.225-.33.225-.541a.808.808 0 0 0-.225-.562l-7.68-7.665a.738.738 0 0 0-.542-.225.738.738 0 0 0-.542.225Zm7.109-.552L15.606 6.19l2.186 2.207 2.206-2.207c.3-.3.45-.664.45-1.093 0-.43-.15-.794-.45-1.094-.313-.3-.681-.45-1.103-.45-.422 0-.79.15-1.103.45Z" />
        </svg>
    );
}

const Memo = memo(IconAppearance);
export default Memo;
