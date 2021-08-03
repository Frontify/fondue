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

function IconAlignMiddle(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconAlignMiddle"
            {...props}
        >
            <path d="M5.04 12.77c-.409 0-.74-.345-.74-.77 0-.425.331-.77.74-.77h13.905c.409 0 .74.345.74.77 0 .425-.331.77-.74.77H5.04zm7.722 3.136v5.325a.77.77 0 01-1.539 0v-5.323l-2.596 2.077a.77.77 0 11-.961-1.201l3.757-3.006a.766.766 0 011.043-.08l3.836 3.078a.77.77 0 01.12 1.08.766.766 0 01-1.078.12l-2.582-2.07zm-1.149-5.544a.775.775 0 01-.101-.069L7.666 7.216a.77.77 0 11.96-1.201l2.597 2.077V2.769a.77.77 0 011.539 0v5.332l2.603-2.082a.77.77 0 01.96 1.2l-3.845 3.078a.77.77 0 01-.867.065z" />
        </svg>
    );
}

const MemoIconAlignMiddle = React.memo(IconAlignMiddle);
export default MemoIconAlignMiddle;
