import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // You can also log the error to an error reporting service
        this.setState({ hasError: true });
        console.error(`Error: ${error}, ${info}`);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="tw-p-4 tw-border tw-border-box-negative-inverse">
                    <h1>Something went wrong.</h1>
                    <p>This is a fallback UI</p>
                </div>
            );
        }

        return this.props.children;
    }
}
