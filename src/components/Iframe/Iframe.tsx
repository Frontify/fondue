/* (c) Copyright Frontify Ltd., all rights reserved. */

import css from "./Iframe.module.css";

export enum IframeHeight {
    Small = "Small",
}

export enum IframeBorder {
    Default = "Default",
}

export enum IframePointerEvents {
    None = "None",
}

export interface IframeProps {
    src: string;
    border?: IframeBorder;
    height?: IframeHeight;
    pointerEvents?: IframePointerEvents;
}

export default function Iframe({ src, border, height, pointerEvents }: IframeProps): React.ReactElement<IframeProps> {
    const classNames = [
        css.iframe,
        ...(border ? [css[`border${border}`]] : []),
        ...(height ? [css[`height${height}`]] : []),
        ...(pointerEvents ? [css[`pointerEvents${pointerEvents}`]] : []),
    ].join(" ");

    return <iframe src={src} className={classNames} />;
}
