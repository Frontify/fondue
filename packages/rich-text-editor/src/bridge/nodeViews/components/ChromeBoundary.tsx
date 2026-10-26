/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Component, type ReactNode } from 'react';

import { type JsonObject } from '#/model';

import { type ReactWork, ReactWorkContext } from '../../session/helpers/devChecks';

export type BoundaryProps = {
    message: string;
    /** The node's attributes; new ones try the chrome again. */
    attrs: JsonObject;
    children: ReactNode;
};
type BoundaryState = {
    failed: boolean;
    attrs: JsonObject;
};

/** Replaces only the chrome that threw with a localized message, while `contentDOM` and editing go on. */
export class ChromeBoundary extends Component<BoundaryProps, BoundaryState> {
    static contextType = ReactWorkContext;
    declare context: ReactWork | undefined;
    state: BoundaryState = { failed: false, attrs: this.props.attrs };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    // The chrome that threw never committed, so its render mark closes here, in the commit that shows the fallback.
    componentDidCatch() {
        if (this.context !== undefined) {
            this.context.rendering = false;
        }
    }

    // Chrome that threw for one attribute value renders again once an update changes the attributes.
    static getDerivedStateFromProps(props: BoundaryProps, state: BoundaryState) {
        if (props.attrs !== state.attrs) {
            return { failed: false, attrs: props.attrs };
        }

        return null;
    }

    render() {
        if (this.state.failed) {
            return <span>{this.props.message}</span>;
        }

        return this.props.children;
    }
}
