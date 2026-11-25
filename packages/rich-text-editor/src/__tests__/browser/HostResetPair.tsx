/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a host page's own stylesheet around the document, such as a `p` reset.

import { type RteDocument } from '../../index';
import { type TextLook } from '../../plugins';

import { HostLooksPair } from './HostLooksPair';
import { HOST_PAGE_CLASS } from './hostStylingValues';

type HostResetPairProps = {
    /** The host page's stylesheet. */
    hostCss: string;
    body?: TextLook;
    /**
     * The document both surfaces draw.
     * @default BODY_QUOTE_LINK_DOCUMENT
     */
    value?: RteDocument;
};

/** The renderer and the editor inside a host page that has its own rules for paragraphs. */
export const HostResetPair = ({ hostCss, body, value }: HostResetPairProps) => (
    <div className={HOST_PAGE_CLASS}>
        <style>{hostCss}</style>
        <HostLooksPair body={body} value={value} />
    </div>
);
