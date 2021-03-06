import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTag(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconTag"
            {...props}
        >
            <path d="M22 13.824c0 .478-.162.878-.485 1.201l-6.49 6.49a1.681 1.681 0 0 1-1.2.485c-.462 0-.855-.162-1.178-.485L3.2 12.069c-.339-.323-.624-.77-.855-1.34C2.116 10.177 2 9.66 2 9.183V3.71c0-.462.17-.862.508-1.2A1.568 1.568 0 0 1 3.686 2h5.496c.462 0 .978.123 1.548.37.554.23 1 .508 1.34.83l9.445 9.424c.323.354.485.754.485 1.2Zm-1.663.023c-.003-.03-3.142-3.177-9.419-9.44-.18-.173-.454-.343-.85-.508-.374-.161-.67-.232-.886-.232H3.686c-.02.032-.026 1.871-.02 5.515 0 .243.068.545.225.922.147.363.306.612.488.787l9.446 9.446c.013-.003 2.184-2.166 6.512-6.49ZM10.333 7.833c0 .673-.251 1.296-.755 1.8a2.52 2.52 0 0 1-3.517-.027 2.471 2.471 0 0 1-.728-1.773c0-.669.255-1.287.728-1.76a2.477 2.477 0 0 1 1.772-.74c.675 0 1.296.263 1.772.74.474.473.728 1.091.728 1.76Zm-1.666 0a.793.793 0 0 0-.24-.582A.812.812 0 0 0 7.833 7a.812.812 0 0 0-.593.251.793.793 0 0 0-.24.582c0 .236.08.434.24.594.167.16.365.24.593.24.229 0 .427-.08.594-.24.16-.16.24-.358.24-.594Z" />
        </svg>
    );
}

const Memo = memo(IconTag);
export default Memo;
