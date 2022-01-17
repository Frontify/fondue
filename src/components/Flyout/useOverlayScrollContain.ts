import { useEffect, useState } from "react";

export const useOverlayScrollContain = (overlayRef) => {
    const [insideBoundary, setInsideBoundary] = useState(false);

    useEffect(() => {
        const scrollEvent = (event) => {
            if (!overlayRef.current.contains(event.target)) {
                console.log("not inside");
                event.preventDefault();
                event.stopPropagation();
            }
        };
        if (insideBoundary && overlayRef.current !== null) {
            window.addEventListener("scroll", scrollEvent, { passive: false, capture: true });
            window.addEventListener("wheel", scrollEvent, { passive: false, capture: true });
        }
        return () => {
            if (insideBoundary && overlayRef.current !== null) {
                window.removeEventListener("scroll", scrollEvent, { passive: false, capture: true });
                window.removeEventListener("wheel", scrollEvent, { passive: false, capture: true });
            }
        };
    }, [insideBoundary, overlayRef.current]);

    const onMouseEnter = () => {
        setInsideBoundary(true);
    };

    const onMouseLeave = () => {
        setInsideBoundary(false);
    };

    return {
        overlayProps: {
            onMouseEnter,
            onMouseLeave,
        },
    };
};
