import { MutableRefObject, useEffect } from "react";

export const useContainScroll = (overlayRef: MutableRefObject<HTMLDivElement | null>, { isDisabled = false }) => {
    useEffect(() => {
        const overlay = overlayRef.current;

        const scrollHandler = (event: WheelEvent) => {
            const prevent = () => {
                event.stopPropagation();
                event.preventDefault();
            };

            if (overlay !== null) {
                const deltaY = event.deltaY;
                const up = deltaY < 0;
                const { scrollTop, scrollHeight, clientHeight } = overlay;

                if (!up && deltaY > scrollHeight - clientHeight - scrollTop) {
                    // Scrolling down, but this will take us past the bottom.
                    overlay.scrollTop = scrollHeight;
                    prevent();
                    return false;
                } else if (up && -deltaY > scrollTop) {
                    // Scrolling up, but this will take us past the top.
                    overlay.scrollTop = 0;
                    prevent();
                    return false;
                }
            }
        };

        const eventProps = { passive: false, capture: true };

        if (!isDisabled && overlay !== null) {
            overlay.addEventListener("wheel", scrollHandler, eventProps);
        }

        return () => {
            if (!isDisabled && overlay !== null) {
                overlay.removeEventListener("wheel", scrollHandler, eventProps);
            }
        };
    }, [isDisabled, overlayRef]);
};
