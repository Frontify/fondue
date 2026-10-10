/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { createPortal } from 'react-dom';

import { DropdownWithScrollingAnchor } from './DropdownWithScrollingAnchor';

type DropdownWithScrollingAnchorInHostProps = {
    host: 'iframe' | 'shadowRoot';
    scrollContainerTestId: string;
    anchorTestId: string;
};

// Copies the rules synchronously, because a cloned stylesheet link would apply only after it loads.
const copyStyles = (target: Node) => {
    const style = document.createElement('style');
    style.textContent = [...document.styleSheets]
        .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
        .join('\n');
    target.appendChild(style);
};

export const DropdownWithScrollingAnchorInHost = ({ host, ...props }: DropdownWithScrollingAnchorInHostProps) => {
    const [mountPoint, setMountPoint] = useState<HTMLElement | null>(null);

    const handleIframe = (iframe: HTMLIFrameElement | null) => {
        const frameDocument = iframe?.contentDocument;
        if (!frameDocument || mountPoint) {
            return;
        }
        copyStyles(frameDocument.head);
        // Keeps the anchor away from the viewport edge, where collision padding would shift the menu.
        frameDocument.body.style.padding = '16px';
        setMountPoint(frameDocument.body);
    };

    const handleShadowHost = (shadowHost: HTMLDivElement | null) => {
        if (!shadowHost || mountPoint) {
            return;
        }
        const shadowRoot = shadowHost.shadowRoot ?? shadowHost.attachShadow({ mode: 'open' });
        copyStyles(shadowRoot);
        const shadowBody = document.createElement('div');
        shadowBody.style.padding = '16px';
        shadowRoot.append(shadowBody);
        setMountPoint(shadowBody);
    };

    return (
        <>
            {host === 'iframe' && (
                <iframe
                    ref={handleIframe}
                    title="Dropdown host"
                    // A host iframe runs scripts, and WebKit skips listeners in an iframe sandboxed without them.
                    // eslint-disable-next-line @eslint-react/dom-no-unsafe-iframe-sandbox
                    sandbox="allow-same-origin allow-scripts"
                    style={{ width: 600, height: 500, border: 0 }}
                />
            )}
            {host === 'shadowRoot' && <div ref={handleShadowHost} />}
            {mountPoint && createPortal(<DropdownWithScrollingAnchor {...props} container={mountPoint} />, mountPoint)}
        </>
    );
};
