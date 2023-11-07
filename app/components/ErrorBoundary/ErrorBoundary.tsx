import React, { Component, ErrorInfo } from "react";
import { ScrollView } from "react-native";

import Text from "../Text";
import Fallback from "./FallBack";
import { boundaryStyles as styles } from "./styles";

interface State {
  errorMessage: string;
  hasError: boolean;
  info: ErrorInfo;
}

interface Props {
  children: React.ReactNode;
}

/**
 * ErrorBoundary component to catch errors in its children and display a Fallback Screen.
 * We can get the information about which part in our component tree threw the error by using
 * the `getDerivedStateFromError` method and `componentDidCatch` lifecycle method.
 * This information can be forwarded to a logging service
 *
 * We use the component to wrap our entire application.
 * @example
 * ```tsx
 * const App = () => (
 *    <ErrorBoundary>
 *      <MyApp />
 *    </ErrorBoundary>
 * );
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: "",
      hasError: false,
      info: { componentStack: "" },
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorMessage: error.message, hasError: true, info });
  }

  render() {
    if (this.state.hasError) {
      if (__DEV__) {
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Text variant="advert">{this.state.errorMessage}</Text>
            <Text variant="body">{this.state.info?.componentStack}</Text>
          </ScrollView>
        );
      }
      return <Fallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
