/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by hostStyling.ct.tsx: a host page's own stylesheet around the document, such as a `p` reset.

import { HostLooksPair, type HostLooksPairProps } from './HostLooksPair';
import { HOST_PAGE_CLASS } from './hostStylingValues';

type HostResetPairProps = {
    /** The host page's stylesheet. */
    hostCss: string;
} & Pick<HostLooksPairProps, 'body' | 'link' | 'buttons' | 'value'>;

/** The renderer and the editor inside a host page that has its own rules for paragraphs. */
export const HostResetPair = ({ hostCss, body, link, buttons, value }: HostResetPairProps) => (
    <div className={HOST_PAGE_CLASS}>
        <style>{hostCss}</style>
        <HostLooksPair body={body} link={link} buttons={buttons} value={value} />
    </div>
);
