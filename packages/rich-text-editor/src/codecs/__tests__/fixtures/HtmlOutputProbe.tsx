/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createCodecs } from '#/codecs';
import {
    COLOR_TOKENS,
    linked,
    marked,
    plain,
    STYLE_MAP,
    styled,
    styledDocument,
    styledHeading,
    styleModel,
} from '#/features/__tests__/fixtures/styles';

const model = styleModel();
const document = styledDocument(model, [
    styledHeading('brand.title', 1, plain('Brand guide')),
    styled(
        'brand.lead',
        plain('See the '),
        linked('basics', null),
        plain(' or '),
        linked('start', 'brand.button'),
        plain(' in '),
        marked('teal', 'font_color', { tokenId: null, value: '#0f766e' }),
        plain(', '),
        marked('red', 'font_color', { tokenId: 'brand.red', value: null }),
        plain(', '),
        marked('sun', 'highlight', { tokenId: 'brand.sun', value: null }),
        plain(' and '),
        marked('rose', 'highlight', { tokenId: null, value: '#fecdd3' }),
    ),
]);

/**
 * The `toHTML` output of brand styles, links and colours with `inlineStyles` and `colorTokens`, as a page renders stored
 * HTML that loads neither the package stylesheet nor the generated recipe stylesheet. It imports no editor module, so
 * no package stylesheet loads.
 */
export const HtmlOutputProbe = () => {
    const { html } = createCodecs(model).toHTML(document, { inlineStyles: STYLE_MAP, colorTokens: COLOR_TOKENS });
    // oxlint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- the probe renders the codec's escaped output as a page would.
    return <section aria-label="Stored HTML" dangerouslySetInnerHTML={{ __html: html }} />;
};
