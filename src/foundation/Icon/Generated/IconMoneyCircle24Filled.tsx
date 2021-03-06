import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconMoneyCircle24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMoneyCircle24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm.75-15.57a.75.75 0 0 0-1.5 0v.405c-.625.08-1.165.262-1.586.598-.65.519-.856 1.269-.856 2.045 0 .95.49 1.607 1.098 2.06.568.422 1.297.712 1.91.956l.012.005c.665.265 1.205.481 1.593.758.352.251.482.481.482.78 0 .482-.232.84-.628 1.106-.416.28-.98.429-1.487.429-.688 0-1.135-.242-1.41-.466a1.865 1.865 0 0 1-.364-.4.75.75 0 1 0-1.33.696l.663-.35-.663.351.002.002.002.004.004.009.013.022c.01.017.023.04.04.065.032.052.078.12.138.2.12.157.299.36.547.563.416.34 1.016.666 1.82.77v.533a.75.75 0 0 0 1.5 0v-.609a4.051 4.051 0 0 0 1.363-.575c.721-.486 1.29-1.271 1.29-2.35 0-.937-.507-1.57-1.11-2.001-.543-.387-1.237-.663-1.829-.898l-.081-.032c-.659-.262-1.197-.486-1.58-.771-.348-.259-.495-.511-.495-.857 0-.523.131-.745.291-.873.204-.162.633-.32 1.527-.32.761 0 1.228.254 1.5.476a1.705 1.705 0 0 1 .351.392l.007.013a.75.75 0 0 0 1.343-.67l-.674.33.673-.33v-.001l-.001-.002-.002-.004-.005-.01-.012-.023a2.578 2.578 0 0 0-.176-.276 3.204 3.204 0 0 0-.555-.58 3.626 3.626 0 0 0-1.825-.773v-.398Zm-3.403 8.622c.663-.351.663-.352.662-.352l-.662.352Zm.658-.36Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMoneyCircle24Filled);
export default Memo;
