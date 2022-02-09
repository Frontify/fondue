import { MutableRefObject, useEffect } from "react";

type ClickOutsideEventType = MouseEvent | TouchEvent;

export const useOnClickOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    handler: (event: ClickOutsideEventType) => {},
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!ref.current || ref.current?.contains(target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
