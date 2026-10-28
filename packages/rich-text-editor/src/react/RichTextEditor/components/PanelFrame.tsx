/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ScrollArea } from '@frontify/fondue-components';
import { Component, type ComponentType, type ReactNode, useRef } from 'react';

import { TABBABLE } from '#/bridge/overlays/helpers/tabbable';
import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { type ReactWork, ReactWorkContext } from '#/bridge/session/helpers/devChecks';
import { useAnnounce } from '#/bridge/session/hooks/useAnnounce';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { type CodecContext } from '#/model';
import { passesToBrowser } from '#/runtime/port';

import styles from '../styles/panels.module.scss';

export type PanelBoundaryProps = {
    message: string;
    closeLabel: string;
    onClose: () => void;
    children: ReactNode;
};

type BoundaryState = {
    failed: boolean;
};

/** Replaces only the panel that threw, and leaves the rest of the editor mounted. */
class PanelBoundary extends Component<PanelBoundaryProps, BoundaryState> {
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
    message: string;
    closeLabel: string;
    onClose: () => void;
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
    id: string;
    panel: ComponentType<PanelComponentProps>;
    t: CodecContext['t'];
    requested: number;
    testId: string;
    onClose: () => void;
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
            <ScrollArea type="auto" maxHeight="16rem" data-test-id={`${testId}-panel-scroll`}>
                <div className={styles.content}>
                    <PanelBoundary
                        key={id}
                        message={t('RichTextEditor_panelError')}
                        closeLabel={t('RichTextEditor_close')}
                        onClose={onClose}
                    >
                        <Panel close={onClose} t={t} requested={requested} />
                    </PanelBoundary>
                </div>
            </ScrollArea>
        </div>
    );
};

PanelFrame.displayName = 'PanelFrame';
