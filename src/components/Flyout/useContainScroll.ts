import { MutableRefObject, useEffect } from "react";

export const useContainScroll = (overlayRef: MutableRefObject<HTMLDivElement | null>, { isDisabled = false }) => {
    useEffect(() => {
        const scrollHandler = (event: WheelEvent) => {
            const prevent = function () {
                event.stopPropagation();
                event.preventDefault();
                return false;
            };
            const overlay = overlayRef.current as HTMLDivElement;
            const deltaY = event.deltaY;
            const up = deltaY < 0;
            const scrollTop = overlay.scrollTop;
            const scrollHeight = overlay.scrollHeight;
            const height = overlay.clientHeight;

            if (!up && deltaY > scrollHeight - height - scrollTop) {
                // Scrolling down, but this will take us past the bottom.
                overlay.scrollTop = scrollHeight;
                return prevent();
            } else if (up && -deltaY > scrollTop) {
                // Scrolling up, but this will take us past the top.
                overlay.scrollTop = 0;
                return prevent();
            }
        };
        const eventProps = { passive: false, capture: true };
        if (!isDisabled && overlayRef.current !== null) {
            overlayRef.current.addEventListener("wheel", scrollHandler, eventProps);
        }
        return () => {
            if (!isDisabled && overlayRef.current !== null) {
                overlayRef.current?.removeEventListener("wheel", scrollHandler, eventProps);
            }
        };
    }, [isDisabled, overlayRef.current]);
};
