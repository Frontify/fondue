import { convertFromHTML } from "draft-convert";
import { ContentState, convertFromRaw, RawDraftContentState } from "draft-js";

type RawHTMLLegacyContentState = { content: string };
export type RawContentState = RawHTMLLegacyContentState | RawDraftContentState;

const isRawDraftContentState = (raw: RawContentState): raw is RawDraftContentState =>
    (raw as RawDraftContentState).blocks !== undefined && (raw as RawDraftContentState).entityMap !== undefined;

const isRawHTMLLegacyContent = (raw: RawContentState): raw is RawHTMLLegacyContentState =>
    (raw as RawHTMLLegacyContentState).content !== undefined;

export const parseRawContentState = (raw: RawContentState): ContentState | null => {
    if (isRawDraftContentState(raw)) {
        return convertFromRaw(raw);
    }

    return isRawHTMLLegacyContent(raw)
        ? convertFromHTML({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              htmlToEntity: (nodeName: string, element: Element, createEntity: any) => {
                  if (nodeName === "a") {
                      return createEntity("LINK", "MUTABLE", {
                          url: (element as HTMLAnchorElement).href,
                          newWindow: element.getAttribute("target") === "_blank",
                      });
                  }
              },
          })(raw.content)
        : null;
};
