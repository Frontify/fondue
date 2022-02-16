import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconArrowRoundClockwise12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconArrowRoundClockwise12"
            {...props}
        >
            <path
                fill="currentColor"
                d="m7.009 9.862.13.483-.13-.483ZM2.11 7.033l-.483.13.483-.13Zm2.827-4.898.13.483-.13-.483Zm4.409 2.944a.5.5 0 0 0 .966-.258l-.966.258Zm.167 3.724a.5.5 0 0 0-.828-.56l.828.56ZM7.5 5a.5.5 0 1 0 0 1V5Zm3 .5V6h.5v-.5h-.5Zm.5-3a.5.5 0 1 0-1 0h1ZM6.88 9.38c-1.906.51-3.775-.57-4.286-2.476l-.966.259c.654 2.44 3.07 3.836 5.51 3.182L6.88 9.38ZM2.593 6.903c-.51-1.907.568-3.776 2.474-4.286l-.26-.966c-2.439.653-3.833 3.07-3.18 5.51l.966-.258Zm2.474-4.286c1.907-.511 3.769.557 4.279 2.461l.966-.258C9.659 2.379 7.246.999 4.809 1.65l.259.967ZM9.1 8.523a59.74 59.74 0 0 1-.414-.28v-.001h.001a2.9 2.9 0 0 1-.41.421 3.628 3.628 0 0 1-1.398.716l.26.966a4.628 4.628 0 0 0 1.78-.914 3.898 3.898 0 0 0 .548-.563 1.792 1.792 0 0 0 .046-.063v-.001l-.413-.28ZM7.5 6h3V5h-3v1Zm3.5-.5v-3h-1v3h1Z"
            />
        </svg>
    );
}

const Memo = memo(IconArrowRoundClockwise12);
export default Memo;
