/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { Component, type ComponentType, type ReactNode, useRef } from 'react';

import { useAnnounce } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/clientLayoutEffect';
import { type PanelComponentProps } from '#/bridge/define';
import { type ReactWork, ReactWorkContext } from '#/bridge/devChecks';
import { TABBABLE } from '#/bridge/overlays';
import { type CodecContext } from '#/model';
import { passesToBrowser } from '#/runtime/port';

import styles from './styles/panels.module.scss';

export type BoundaryProps = {
    readonly message: string;
    readonly closeLabel: string;
    readonly onClose: () => void;
    readonly children: ReactNode;
};

interface BoundaryState {
    readonly failed: boolean;
}

/** Replaces only the panel that threw, and leaves the rest of the editor mounted. */
class PanelBoundary extends Component<BoundaryProps, BoundaryState> {
    static contextType = ReactWorkContext;
    declare context: ReactWork | undefined;
    state: BoundaryState = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    // The panel that threw never committed, so a development render mark would otherwise stay open.
    componentDidCatch() {
        if (this.context !== undefined) {
            this.context.rendering = false;
            this.context.phase = false;
        }
    }

    render() {
        if (this.state.failed) {
            return (
                <PanelFallback
                    message={this.props.message}
                    closeLabel={this.props.closeLabel}
                    onClose={this.props.onClose}
                />
            );
        }
        return this.props.children;
    }
}

/** The localized message and Close button that replace a panel whose render threw. */
const PanelFallback = ({
    message,
    closeLabel,
    onClose,
}: {
    readonly message: string;
    readonly closeLabel: string;
    readonly onClose: () => void;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const announce = useAnnounce();
    useClientLayoutEffect(() => {
        buttonRef.current?.focus();
        announce(message);
    }, [announce, message]);
    return (
        <div className={styles.fallback}>
            <p>{message}</p>
            <Button ref={buttonRef} emphasis="default" onPress={onClose}>
                {closeLabel}
            </Button>
        </div>
    );
};

/** The open panel, with its error boundary. It takes focus when it opens, and Escape closes it. */
export const PanelFrame = ({
    id,
    panel: Panel,
    t,
    requested,
    testId,
    onClose,
}: {
    readonly id: string;
    readonly panel: ComponentType<PanelComponentProps>;
    readonly t: CodecContext['t'];
    readonly requested: number;
    readonly testId: string;
    readonly onClose: () => void;
}) => {
    const slotRef = useRef<HTMLDivElement>(null);
    // Runs after the panel's own layout effects, so a panel that focused itself keeps that focus.
    useClientLayoutEffect(() => {
        const node = slotRef.current;
        if (node === null || node.contains(node.ownerDocument.activeElement)) {
            return;
        }
        node.querySelector<HTMLElement>(TABBABLE)?.focus();
    }, [id]);
    useClientLayoutEffect(() => {
        const node = slotRef.current;
        const view = node?.ownerDocument.defaultView;
        if (node === null || view === null || view === undefined) {
            return undefined;
        }
        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            const target = event.composedPath()[0];
            if (
                event.key !== 'Escape' ||
                passesToBrowser(event) ||
                !(target instanceof Node) ||
                !node.contains(target)
            ) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            onClose();
        };
        view.addEventListener('keydown', onKeyDown, true);
        return () => view.removeEventListener('keydown', onKeyDown, true);
    }, [onClose]);
    return (
        <div
            ref={slotRef}
            className={styles.slot}
            data-rte-panel=""
            data-rte-panel-id={id}
            data-test-id={`${testId}-panel`}
        >
            <PanelBoundary
                key={id}
                message={t('RichTextEditor_panelError')}
                closeLabel={t('RichTextEditor_close')}
                onClose={onClose}
            >
                <Panel close={onClose} t={t} requested={requested} />
            </PanelBoundary>
        </div>
    );
};
