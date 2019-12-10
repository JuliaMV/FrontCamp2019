import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    state = {
      hasError: false,
    }

    static getDerivedStateFromError() {
      return {
        hasError: true,
      };
    }

    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }

    render() {
      const { hasError } = this.state;
      const { fallback, children } = this.props;
      if (hasError) {
        return fallback;
      }
      return children;
    }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.element,
  children: PropTypes.element.isRequired,
};

ErrorBoundary.defaultProps = {
  fallback: <h1>Something went wrong.</h1>,
};

export default ErrorBoundary;
