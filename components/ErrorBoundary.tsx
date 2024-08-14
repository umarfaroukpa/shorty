import React, { Component, ErrorInfo } from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        // Update state to trigger fallback UI rendering
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error information for debugging or error reporting
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI to inform the user about the error
            return (
                <div className="flex items-center justify-center min-h-screen bg-black text-white">
                    <h1>Something went wrong. Please try again later.</h1>
                </div>
            );
        }

        // Render the children components if no error is encountered
        return this.props.children;
    }
}

export default ErrorBoundary;
