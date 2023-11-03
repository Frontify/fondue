/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleDeviceDetection = () => {
            const isMobileScreen = window.matchMedia('only screen and (max-width: 480px)').matches;

            setIsMobile(isMobileScreen);
        };

        handleDeviceDetection();
        window.addEventListener('resize', handleDeviceDetection);

        return () => {
            window.removeEventListener('resize', handleDeviceDetection);
        };
    }, []);

    return isMobile;
};

export default useMobileDetection;
