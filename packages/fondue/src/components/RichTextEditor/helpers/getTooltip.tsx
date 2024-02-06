/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getTooltip = (content: string) => {
    const contentItems = content.split('\n');
    return contentItems.map((item, index) => {
        return (
            <span key={item}>
                {contentItems.length > 1 && index === 0 ? <strong>{item}</strong> : item}
                <br />
            </span>
        );
    });
};
