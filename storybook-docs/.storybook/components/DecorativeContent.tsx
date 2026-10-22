/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * This component is used to create a decorative background for stories.
 */
export const DecorativeContent = () => {
    return (
        <div
            style={{
                background: `
                    conic-gradient(
                        #FFF 90deg,
                        #E6E6E6 90deg 180deg,
                        #FFF 180deg 270deg,
                        #E6E6E6 270deg
                    )
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: 'top left',
                backgroundRepeat: 'repeat',
                height: '100%',
                width: '100%',
            }}
        />
    );
};
DecorativeContent.displayName = 'DecorativeContent';
