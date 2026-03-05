import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("UI Crash:", error, info);
  }

  render() {

    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding: 40,
            textAlign: "center",
            fontFamily: "sans-serif"
          }}
        >
          <h2>Something went wrong.</h2>
          <p>Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}