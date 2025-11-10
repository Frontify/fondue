/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

/**
 * @deprecated Please use useMediaQuery() in web-app or a custom function instead.
 **/
export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleDeviceDetection = () => {
            const isSmallScreen = window.matchMedia('only screen and (max-width: 640px)').matches;

            setIsMobile(isSmallScreen);
        };

        handleDeviceDetection();
        window.addEventListener('resize', handleDeviceDetection);
        window.addEventListener('load', handleDeviceDetection);

        return () => {
            window.removeEventListener('resize', handleDeviceDetection);
            window.removeEventListener('load', handleDeviceDetection);
        };
    }, []);

    return isMobile;
};
