import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoneyCircle20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMoneyCircle20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Zm.508-4.324v1.2H9.373v-1.223c-1.037-.185-1.761-.831-1.977-1.88l1.264-.347c.076.635.691 1.038 1.415 1.038.692 0 1.113-.392 1.113-1.038 0-.736-.684-.925-1.463-1.14-1.028-.285-2.221-.615-2.221-2.309 0-1.211.734-2.065 1.87-2.296V4.792h1.134v1.2c1.048.16 1.772.818 1.977 1.764l-1.297.404c-.108-.565-.562-.946-1.22-.946-.638 0-1.027.323-1.027.935 0 .735.68.927 1.455 1.145 1.022.288 2.208.622 2.208 2.315 0 1.27-.843 2.204-2.096 2.4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMoneyCircle20Filled);
export default Memo;
