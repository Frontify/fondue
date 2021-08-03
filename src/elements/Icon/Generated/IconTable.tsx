import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconTable(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTable"
            {...props}
        >
            <path d="M9.692 8.625v2.625h4.616V8.625H9.692zm-1.538 0H3.538v2.625h4.616V8.625zm-4.616-1.5h16.924V5.25a.76.76 0 00-.77-.75H4.308a.76.76 0 00-.77.75v1.875zm16.924 1.5h-4.616v2.625h4.616V8.625zM9.692 12.75v2.625h4.616V12.75H9.692zm-1.538 0H3.538v2.625h4.616V12.75zm12.308 0h-4.616v2.625h4.616V12.75zm-10.77 4.125V19.5h4.616v-2.625H9.692zm-1.538 0H3.538v1.875c0 .414.345.75.77.75h3.846v-2.625zm12.308 0h-4.616V19.5h3.846a.76.76 0 00.77-.75v-1.875zM4.308 3h15.384C20.967 3 22 4.007 22 5.25v13.5c0 1.243-1.033 2.25-2.308 2.25H4.308C3.033 21 2 19.993 2 18.75V5.25C2 4.007 3.033 3 4.308 3z" />
        </svg>
    );
}

const MemoIconTable = React.memo(IconTable);
export default MemoIconTable;
