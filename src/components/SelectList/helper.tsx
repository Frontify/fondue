import { SelectListItem } from "./SelectList";

export const getKeyItemRecord = <T extends SelectListItem>(items: T[]): Record<string, T> =>
    items.reduce<Record<string, T>>((previous, item) => ({ ...previous, [item.name]: item }), {});
