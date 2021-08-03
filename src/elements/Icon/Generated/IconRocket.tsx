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

function IconRocket(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconRocket"
            {...props}
        >
            <path d="M9.903 20.269c1.294.554 3.235.37 4.806-.646 1.572-1.016 2.311-2.678 1.941-3.878l-6.747 4.524zm7.672-6.001c1.386 2.03.37 4.893-2.034 6.555-2.403 1.57-5.638 1.57-7.394 0l-.647-.646 9.613-6.463.462.554zM9.81 6.512l.555.37-6.47 9.602-.647-.647c-1.664-1.754-1.664-4.985 0-7.386C4.912 6.143 7.777 5.128 9.81 6.512zM4.45 9.375c-1.017 1.477-1.202 3.508-.648 4.8l4.53-6.74c-1.202-.369-2.866.37-3.883 1.94zm11.646 4.616c3.235-3.232 5.453-8.863 4.16-10.156-1.295-1.292-7.026.923-10.168 4.155-1.387 1.385-2.496 3.046-3.143 4.8l4.53 4.525c1.57-.831 3.234-1.94 4.62-3.324zm-10.907-.923l.185-.462c.74-2.031 2.033-4.062 3.697-5.724C12.768 3.189 19.238.696 21.272 2.727c2.033 2.031-.462 8.494-4.16 12.187-1.663 1.662-3.604 2.954-5.73 3.693l-.37.277-5.823-5.816zm8.504-2.678c-1.017-1.015-1.017-2.585 0-3.508 1.016-.923 2.588-1.016 3.512 0 .924 1.015 1.017 2.585 0 3.508s-2.588 1.016-3.512 0zm1.016-1.015c.463.461 1.11.461 1.48 0 .461-.462.461-1.108 0-1.478-.463-.369-1.11-.461-1.48 0-.37.462-.462 1.016 0 1.478z" />
        </svg>
    );
}

const MemoIconRocket = React.memo(IconRocket);
export default MemoIconRocket;
