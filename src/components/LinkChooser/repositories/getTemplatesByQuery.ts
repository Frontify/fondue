import { SearchResult } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTemplatesByQuery = async (query: string): Promise<SearchResult[]> => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve([]);
        }, 2000),
    );
};
