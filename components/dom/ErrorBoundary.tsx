'use client'

import { Component, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="w-full py-16 flex items-center justify-center">
                    <div className="glass-card p-8 text-center max-w-md">
                        <p className="text-white text-lg font-semibold mb-2">Something went wrong</p>
                        <p className="text-gray-400 text-sm mb-4">This section failed to load.</p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="btn-secondary !px-4 !py-2 !text-sm cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
