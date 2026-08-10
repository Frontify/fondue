import { defaultPlugins as i } from "./fondue-new-rte2.js";
import { BoldPlugin as n } from "./fondue-new-rte3.js";
import { ItalicPlugin as m } from "./fondue-new-rte4.js";
import { LinkPlugin as x } from "./fondue-new-rte5.js";
import { HeadingPlugin as f, isHeadingBlock as p } from "./fondue-new-rte6.js";
import { QuotePlugin as s, isQuoteBlock as P } from "./fondue-new-rte7.js";
import { ImagePlugin as k, isImageBlock as B } from "./fondue-new-rte8.js";
import { RichTextEditor as H } from "./fondue-new-rte9.js";
const e = (o) => ({
  version: 1,
  blocks: [...o]
});
export {
  n as BoldPlugin,
  f as HeadingPlugin,
  k as ImagePlugin,
  m as ItalicPlugin,
  x as LinkPlugin,
  s as QuotePlugin,
  H as RichTextEditor,
  e as createDocument,
  i as defaultPlugins,
  p as isHeadingBlock,
  B as isImageBlock,
  P as isQuoteBlock
};
//# sourceMappingURL=fondue-new-rte.js.map
