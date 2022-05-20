import { SearchResult } from "@components/LinkChooser";
import { LinkPlugin } from "@udecode/plate";

export const ELEMENT_LINK_CHOOSER = "link_chooser";

export type ChosenLink = { searchResult: SearchResult | null; openInNewTab: boolean };

export interface LinkChooserPlugin extends LinkPlugin {
    /**
     * On keyboard shortcut or toolbar mousedown, get the link url by calling this promise. The
     * default behavior is to use the browser's native `prompt`.
     */
    getChosenLink?: (prevUrl: ChosenLink) => Promise<ChosenLink>;
}
