import { TYPEABLE_INPUT_TYPES } from "./constants";

export const isTypeable = (target: EventTarget): boolean => {
    switch ((target as HTMLElement).nodeName) {
        case "TEXTAREA":
            return !(target as HTMLTextAreaElement).readOnly && !(target as HTMLTextAreaElement).disabled;
        case "INPUT":
            return (
                TYPEABLE_INPUT_TYPES.includes((target as HTMLInputElement).type) &&
                !(target as HTMLInputElement).readOnly &&
                !(target as HTMLInputElement).disabled
            );
        case "DIV":
            return (target as HTMLDivElement).isContentEditable;
        default:
            return false;
    }
};
