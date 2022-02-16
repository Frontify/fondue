import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconScissors32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconScissors32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m21.18 6.83-7.065 7.065-1.903-1.766c1.087-2.038.816-4.62-.815-6.25-1.902-2.039-5.163-1.903-7.202 0-2.038 1.902-2.038 5.163 0 7.473 1.767 1.766 4.349 2.038 6.25.815l1.903 1.902-1.902 1.903c-2.038-1.087-4.62-.816-6.25.815-2.039 1.902-1.903 5.164 0 7.202 1.902 2.038 5.163 2.038 7.201 0 1.767-1.767 2.038-4.349.815-6.25l10.87-10.871c.68-.68 1.631-.951 2.447-.68L15.066 18.651l5.843 5.843c1.902 2.038 5.163 2.038 7.201 0l.952-.951-7.746-7.745 8.017-8.017-.95-.952c-1.903-2.038-5.164-2.038-7.203 0Zm1.495 15.762L18.6 18.515l.951-.815 5.571 5.571c-.815.272-1.766 0-2.446-.68ZM9.631 11.178c.95-.952.95-2.582 0-3.67-.952-.95-2.582-.95-3.67 0-.95.952-.95 2.583 0 3.67 1.088 1.087 2.583 1.087 3.67 0Zm0 9.104c.95 1.087.95 2.717 0 3.669-1.087.95-2.582.95-3.67 0-.95-1.088-.95-2.718 0-3.67 1.088-.95 2.718-.95 3.67 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScissors32);
export default Memo;
